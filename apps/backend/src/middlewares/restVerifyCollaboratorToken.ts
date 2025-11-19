import { Request, Response, NextFunction } from "express";
import { CollaboratorRepository } from "../repositories/CollaboratorRepository";
import { verify } from "jsonwebtoken";
import { CollaboratorRole } from "../models/Collaborator";

export interface CollaboratorPayload {
  sub: string;
  role: CollaboratorRole;
}

declare global {
  namespace Express {
    interface Request {
      user?: CollaboratorPayload;
    }
  }
}

export function restVerifyCollaboratorToken(roles: string[]) {
  return async (request: Request, reply: Response, next: NextFunction) => {
    const authHeader = request.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return reply.status(401).json({ message: "Token missing" });
    }

    try {
      const payload = verify(token, process.env.AUTH_SECRET!) as CollaboratorPayload;

      if (!roles.includes(payload.role)) {
        return reply
          .status(401)
          .json({ message: "You need to be either an admin or a receptionist to enroll someone in a class" });
      }

      const collaboratorRepository = new CollaboratorRepository();

      const collaborator = await collaboratorRepository.findById(payload.sub);

      if (!collaborator) {
        return reply.status(401).json({ message: "Collaborator not found" });
      }

      request.user = payload;
      next();
    } catch (error) {
      return reply.status(500).json({ error });
    }
  };
}
