import { Request, Response, NextFunction } from "express";
import { ConflictException } from "../exceptions/ConflictException";
import { NotFoundException } from "../exceptions/NotFoundException";
import { InvalidCredentialsException } from "../exceptions/InvalidCredentialsException";

export function restExceptionHandler(err: any, request: Request, response: Response, next: NextFunction) {
  let statusCode = 500;
  let message = "Internal server error";

  switch (true) {
    case err instanceof ConflictException:
      statusCode = err.statusCode;
      message = err.message;
      break;

    case err instanceof NotFoundException:
      statusCode = err.statusCode;
      message = err.message;
      break;

    case err instanceof InvalidCredentialsException:
      statusCode = err.statusCode;
      message = err.message;
      break;

    default:
      console.log("Error: ", err);
      break;
  }

  response.status(statusCode).json({ error: message });
}
