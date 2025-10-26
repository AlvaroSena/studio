import { InvalidCredentialsException } from "../exceptions/InvalidCredentialsException";
import { ICollaboratorRepository } from "../repositories/ICollaboratorRepository";
import { CollaboratorRole } from "../models/Collaborator";
import { compare } from "bcryptjs";
import { generateTokens } from "../utils/generateTokens";
import { verify } from "jsonwebtoken";
import { resend } from "../utils/resend";
import { generateNumericOtp, hashOtp } from "../utils/otp";
import redis from "../utils/redis";

const OTP_TTL = 10 * 60; // 10 minutos
const MAX_ATTEMPTS = 5;

export interface CollaboratorPayloadDTO {
  sub: string;
  role: CollaboratorRole;
}

export class AuthService {
  constructor(private collaboratorRepository: ICollaboratorRepository) {}

  async login(email: string, password: string) {
    const user = await this.collaboratorRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsException("E-mail or password is incorrect.");
    }

    const passwordMatch = await compare(password, user.getPassword());

    if (!passwordMatch) {
      throw new InvalidCredentialsException("E-mail or password is incorrect.");
    }

    const code = generateNumericOtp();
    const hashed = hashOtp(email, code);

    const key = `otp:${email.toLocaleLowerCase()}`;

    await redis.hmset(key, { hash: hashed, attempts: MAX_ATTEMPTS });
    await redis.expire(key, OTP_TTL);

    if (process.env.NODE_ENV === "development") {
      console.log({
        OTPCode: code,
      });
    }

    if (process.env.NODE_ENV === "production") {
      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: email,
        subject: "Código para Autenticação",
        html: `<strong>${code}</strong>`,
      });
    }

    return {
      userId: user.getId(),
    };
  }

  async verifyCode(code: string, userId: string) {
    const user = await this.collaboratorRepository.findById(userId);

    if (!user) {
      throw new InvalidCredentialsException("E-mail or password is incorrect.");
    }

    const email = user.getEmail();

    const key = `otp:${email.toLocaleLowerCase()}`;

    const data = await redis.hgetall<{ hash: string; attempts: string }>(key);

    if (!data?.hash) {
      return { ok: false, reason: "expirado_ou_inexistente" };
    }

    const attemptsLeft = Number(data.attempts);
    if (attemptsLeft <= 0) {
      await redis.del(key);
    }

    const hashed = hashOtp(email, code);
    if (hashed !== data.hash) {
      await redis.hincrby(key, "attempts", -1);
      throw new InvalidCredentialsException("Invalid code.");
    }

    await redis.del(key); // OTP usado com sucesso

    const { accessToken, refreshToken } = generateTokens({ sub: user.getId(), role: user.getRole() });

    return {
      accessToken,
      refreshToken,
    };
  }

  refresh(token: string) {
    const payload = verify(token, process.env.AUTH_SECRET!) as CollaboratorPayloadDTO;

    const { accessToken, refreshToken } = generateTokens({
      sub: payload.sub,
      role: payload.role,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async forgotPassword(email: string) {
    const user = await this.collaboratorRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsException("E-mail is incorrect.");
    }

    const code = generateNumericOtp();
    const hashed = hashOtp(email, code);

    const key = `otp:${email.toLocaleLowerCase()}`;

    await redis.hmset(key, { hash: hashed, attempts: MAX_ATTEMPTS });
    await redis.expire(key, OTP_TTL);

    await redis.hset(key, {
      hash: hashOtp(email, code),
      attempts: 3,
    });

    if (process.env.NODE_ENV === "development") {
      console.log({
        OTPCode: code,
      });
    }

    if (process.env.NODE_ENV === "production") {
      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: email,
        subject: "Código para Recuperação de Senha",
        html: `<strong>${code}</strong>`,
      });
    }
  }

  async resetPassword(email: string, code: string, password: string) {
    const user = await this.collaboratorRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsException("E-mail is incorrect.");
    }

    const key = `otp:${email.toLocaleLowerCase()}`;
    const data = await redis.hgetall(key);

    if (!data) {
      throw new InvalidCredentialsException("OTP is invalid.");
    }

    const attemptsLeft = parseInt(data.attempts);

    if (attemptsLeft <= 0) {
      await redis.del(key);
    }

    const hashed = hashOtp(email, code);
    if (hashed !== data.hash) {
      await redis.hincrby(key, "attempts", -1);
      throw new InvalidCredentialsException("Invalid code.");
    }

    await redis.del(key); // OTP usado com sucesso

    const { accessToken, refreshToken } = generateTokens({ sub: user.getId(), role: user.getRole() });

    return {
      accessToken,
      refreshToken,
    };
  }
}
