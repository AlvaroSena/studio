import { Router, Request, Response } from "express";
import { CollaboratorController } from "../controllers/CollaboratorController";
import { CollaboratorService } from "../services/CollaboratorService";
import { CollaboratorRepository } from "../repositories/CollaboratorRepository";
import { restVerifyCollaboratorToken } from "../middlewares/restVerifyCollaboratorToken";
import { upload } from "../utils/upload";

export const collaboratorRoutes = Router();

const collaboratorRepository = new CollaboratorRepository();
const collaboratorService = new CollaboratorService(collaboratorRepository);
const collaboratorController = new CollaboratorController(collaboratorService);

collaboratorRoutes.get("/", restVerifyCollaboratorToken, (request: Request, response: Response) =>
  collaboratorController.listAll(request, response),
);
collaboratorRoutes.post("/", (request: Request, response: Response) =>
  collaboratorController.create(request, response),
);
collaboratorRoutes.get("/:id", restVerifyCollaboratorToken, (request: Request, response: Response) =>
  collaboratorController.getById(request, response),
);
collaboratorRoutes.get("/profile/me", restVerifyCollaboratorToken, (request: Request, response: Response) =>
  collaboratorController.getProfile(request, response),
);
collaboratorRoutes.delete("/delete/:id", restVerifyCollaboratorToken, (request: Request, response: Response) =>
  collaboratorController.delete(request, response),
);
collaboratorRoutes.patch(
  "/upload",
  upload.single("photo"),
  restVerifyCollaboratorToken,
  (request: Request, response: Response) => collaboratorController.upload(request, response),
);
