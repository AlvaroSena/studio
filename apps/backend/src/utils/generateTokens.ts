import { sign } from "jsonwebtoken";
import { UserRole } from "../models/UserModel";

export interface UserPayload {
  sub: string;
  role: UserRole;
}

export function generateTokens(user: UserPayload) {
  const accessToken = sign(user, process.env.AUTH_SECRET!, {
    expiresIn: "15m",
  });
  const refreshToken = sign(user, process.env.AUTH_SECRET!, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
}
