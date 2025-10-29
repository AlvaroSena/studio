import { Router, Request, Response } from "express";
import { CollaboratorController } from "../controllers/CollaboratorController";
import { CollaboratorService } from "../services/CollaboratorService";
import { CollaboratorRepository } from "../repositories/CollaboratorRepository";
import { restVerifyAdminToken } from "../middlewares/restVerifyAdminToken";
import { upload } from "../utils/upload";

export const collaboratorRoutes = Router();

const collaboratorRepository = new CollaboratorRepository();
const collaboratorService = new CollaboratorService(collaboratorRepository);
const collaboratorController = new CollaboratorController(collaboratorService);

collaboratorRoutes.get("/", restVerifyAdminToken, (request: Request, response: Response) =>
  collaboratorController.listAll(request, response),
);
collaboratorRoutes.post("/", (request: Request, response: Response) =>
  collaboratorController.create(request, response),
);
collaboratorRoutes.get("/:id", restVerifyAdminToken, (request: Request, response: Response) =>
  collaboratorController.getById(request, response),
);
collaboratorRoutes.get("/profile/me", restVerifyAdminToken, (request: Request, response: Response) =>
  collaboratorController.getProfile(request, response),
);
collaboratorRoutes.delete("/delete/:id", restVerifyAdminToken, (request: Request, response: Response) =>
  collaboratorController.delete(request, response),
);
collaboratorRoutes.patch(
  "/upload", 
  upload.single("photo"), 
  restVerifyAdminToken,
  (request: Request, response: Response) => 
  collaboratorController.upload(request, response),
);
