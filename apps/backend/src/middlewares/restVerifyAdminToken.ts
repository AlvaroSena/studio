import { Request, Response, NextFunction } from "express";
import { CollaboratorRepository } from "../repositories/CollaboratorRepository";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: Payload;
  }
}

export async function restVerifyAdminToken(request: Request, reply: Response, next: NextFunction) {
  const authHeader = request.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return reply.status(401).json({ message: "Token missing" });
  }

  try {
    const payload = verify(token, process.env.AUTH_SECRET!) as Payload;

    const collaboratorRepository = new CollaboratorRepository();

    const collaborator = await collaboratorRepository.findById(payload.sub);

    if (!collaborator) {
      return reply.status(401).json({ message: "User not found" });
    }

    if (collaborator.getRole() !== "admin") {
      return reply.status(401).json({ message: "Unauthorized" });
    }

    request.user = payload;
    next();
  } catch (error) {
    return reply.status(500).json({ error });
  }
}
