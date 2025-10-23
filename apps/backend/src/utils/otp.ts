import { randomInt, createHmac } from "node:crypto";

const OTP_LENGTH = 6;
const OTP_SECRET = process.env.OTP_SECRET ?? "troque_isto_por_variavel_de_ambiente";

export function generateNumericOtp(length = OTP_LENGTH): string {
  const max = 10 ** length;
  const n = randomInt(0, max); // crypto-secure
  return n.toString().padStart(length, "0");
}

export function hashOtp(otp: string, email: string): string {
  // HMAC com secret + identificador (email) para ligar ao usuário
  return createHmac("sha256", OTP_SECRET).update(`${email}:${otp}`).digest("hex");
}
