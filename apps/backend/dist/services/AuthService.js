"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const InvalidCredentialsException_1 = require("../exceptions/InvalidCredentialsException");
const bcryptjs_1 = require("bcryptjs");
const generateTokens_1 = require("../utils/generateTokens");
const jsonwebtoken_1 = require("jsonwebtoken");
const resend_1 = require("../utils/resend");
const otp_1 = require("../utils/otp");
const redis_1 = __importDefault(require("../utils/redis"));
const OTP_TTL = 10 * 60; // 10 minutos
const MAX_ATTEMPTS = 5;
class AuthService {
    collaboratorRepository;
    constructor(collaboratorRepository) {
        this.collaboratorRepository = collaboratorRepository;
    }
    async login(email, password) {
        const user = await this.collaboratorRepository.findByEmail(email);
        if (!user) {
            throw new InvalidCredentialsException_1.InvalidCredentialsException("E-mail or password is incorrect.");
        }
        const passwordMatch = await (0, bcryptjs_1.compare)(password, user.getPassword());
        if (!passwordMatch) {
            throw new InvalidCredentialsException_1.InvalidCredentialsException("E-mail or password is incorrect.");
        }
        const code = (0, otp_1.generateNumericOtp)();
        const hashed = (0, otp_1.hashOtp)(email, code);
        const key = `otp:${email.toLocaleLowerCase()}`;
        await redis_1.default.hmset(key, { hash: hashed, attempts: MAX_ATTEMPTS });
        await redis_1.default.expire(key, OTP_TTL);
        if (process.env.NODE_ENV === "development") {
            console.log({
                OTPCode: code,
            });
        }
        if (process.env.NODE_ENV === "production") {
            await resend_1.resend.emails.send({
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
    async verifyCode(code, userId) {
        const user = await this.collaboratorRepository.findById(userId);
        if (!user) {
            throw new InvalidCredentialsException_1.InvalidCredentialsException("E-mail or password is incorrect.");
        }
        const email = user.getEmail();
        const key = `otp:${email.toLocaleLowerCase()}`;
        const data = await redis_1.default.hgetall(key);
        if (!data?.hash) {
            return { ok: false, reason: "expirado_ou_inexistente" };
        }
        const attemptsLeft = Number(data.attempts);
        if (attemptsLeft <= 0) {
            await redis_1.default.del(key);
        }
        const hashed = (0, otp_1.hashOtp)(email, code);
        if (hashed !== data.hash) {
            await redis_1.default.hincrby(key, "attempts", -1);
            throw new InvalidCredentialsException_1.InvalidCredentialsException("Invalid code.");
        }
        await redis_1.default.del(key); // OTP usado com sucesso
        const { accessToken, refreshToken } = (0, generateTokens_1.generateTokens)({ sub: user.getId(), role: user.getRole() });
        return {
            accessToken,
            refreshToken,
        };
    }
    refresh(token) {
        const payload = (0, jsonwebtoken_1.verify)(token, process.env.AUTH_SECRET);
        const { accessToken, refreshToken } = (0, generateTokens_1.generateTokens)({
            sub: payload.sub,
            role: payload.role,
        });
        return {
            accessToken,
            refreshToken,
        };
    }
}
exports.AuthService = AuthService;
