import { Request, Response, NextFunction } from "express";
import { Exception } from "../exceptions/Exception";

export function restExceptionHandler(err: any, request: Request, response: Response, next: NextFunction) {
  let statusCode = 500;
  let message = "Internal server error";

  if (err instanceof Exception) {
    statusCode = err.statusCode;
    message = err.message;
  }

  return response.status(statusCode).json({ error: message });
}
