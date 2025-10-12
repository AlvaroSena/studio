import { Exception } from "./Exception";

export class InvalidCredentialsException extends Exception {
  constructor(message?: string) {
    super(message ?? "Invalid credentials.", 401);
  }
}
