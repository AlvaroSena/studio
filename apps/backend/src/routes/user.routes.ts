import { Router, Request, Response } from "express";
import { restVerifyAdminToken } from "../middlewares/restVerifyAdminToken";
import { CollaboratorController } from "../controllers/CollaboratorController";
import { CollaboratorService } from "../services/CollaboratorService";
import { CollaboratorRepository } from "../repositories/CollaboratorRepository";

export const collaboratorRoutes = Router();

const collaboratorRepository = new CollaboratorRepository();
const collaboratorService = new CollaboratorService(collaboratorRepository);
const collaboratorController = new CollaboratorController(collaboratorService);

collaboratorRoutes.get("/", (request: Request, response: Response) =>
  collaboratorController.listAll(request, response),
);
collaboratorRoutes.post("/", (request: Request, response: Response) =>
  collaboratorController.create(request, response),
);
// collaboratorRoutes.get("/:id", restVerifyAdminToken, userController.findById);
// collaboratorRoutes.get("/profile/me", restVerifyAdminToken, userController.findMe);
// collaboratorRoutes.delete("/delete/:id", restVerifyAdminToken, userController.deleteUser);
