import { compare } from "bcryptjs";
import { generateTokens } from "../utils/generateTokens";
import { InvalidCredentialsException } from "../exceptions/InvalidCredentialsException";
import { IUserRepository } from "../repositories/IUserRepository";
import { UserPayloadDTO } from "../dtos/UserDTO";
import { verify } from "jsonwebtoken";

export class AuthService {
  constructor(private userRepository: IUserRepository) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsException("E-mail or password is incorrect.");
    }

    const passwordMatch = await compare(password, user.getPassword());

    if (!passwordMatch) {
      throw new InvalidCredentialsException("E-mail or password is incorrect.");
    }

    const { accessToken, refreshToken } = generateTokens({ sub: user.getId(), role: user.getRole() });

    return {
      accessToken,
      refreshToken,
    };
  }

  refresh(token: string) {
    const payload = verify(token, process.env.AUTH_SECRET!) as UserPayloadDTO;
    const { accessToken, refreshToken } = generateTokens({
      sub: payload.sub,
      role: payload.role,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
