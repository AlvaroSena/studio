import { sign } from "jsonwebtoken";
import { CollaboratorRole } from "../models/Collaborator";

export interface UserPayload {
  sub: string;
  role: CollaboratorRole;
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
