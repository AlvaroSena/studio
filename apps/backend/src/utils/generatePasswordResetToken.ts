import crypto from "node:crypto";

export function generatePasswordResetToken() {
  return crypto.randomBytes(32).toString("hex");
}
