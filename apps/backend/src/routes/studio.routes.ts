import { Router, Request, Response } from "express";
import { StudioController } from "../controllers/StudioController";
import { StudioService } from "../services/StudioService";
import { StudioRepository } from "../repositories/StudioRepository";
import { restVerifyCollaboratorToken } from "../middlewares/restVerifyCollaboratorToken";

export const studioRoutes = Router();

const studioRepository = new StudioRepository();
const studioService = new StudioService(studioRepository);
const studioController = new StudioController(studioService);

studioRoutes.get("/", restVerifyCollaboratorToken, (request: Request, response: Response) =>
  studioController.listAll(request, response),
);
studioRoutes.post("/", restVerifyCollaboratorToken, (request: Request, response: Response) =>
  studioController.create(request, response),
);
studioRoutes.get("/:id", restVerifyCollaboratorToken, (request: Request, response: Response) =>
  studioController.getById(request, response),
);
studioRoutes.put("/update/:id", restVerifyCollaboratorToken, (request: Request, response: Response) =>
  studioController.update(request, response),
);
studioRoutes.delete("/delete/:id", restVerifyCollaboratorToken, (request: Request, response: Response) =>
  studioController.delete(request, response),
);
