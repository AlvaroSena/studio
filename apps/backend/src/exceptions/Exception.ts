export class Exception extends Error {
  public readonly statusCode: number;

  constructor(message: string, code: number = 400) {
    super(message);
    this.statusCode = code;
  }
}
