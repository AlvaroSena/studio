import { Exception } from "./Exception";

export class ConflictException extends Exception {
  constructor(message?: string) {
    super(message ?? "Conflict.", 409);
  }
}
