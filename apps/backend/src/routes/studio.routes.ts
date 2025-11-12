import { Router, Request, Response } from "express";
import { StudioController } from "../controllers/StudioController";
import { StudioService } from "../services/StudioService";
import { StudioRepository } from "../repositories/StudioRepository";
import { restVerifyAdminToken } from "../middlewares/restVerifyAdminToken";

export const studioRoutes = Router();

const studioRepository = new StudioRepository();
const studioService = new StudioService(studioRepository);
const studioController = new StudioController(studioService);

studioRoutes.get("/", restVerifyAdminToken, (request: Request, response: Response) =>
  studioController.listAll(request, response),
);
studioRoutes.post("/", restVerifyAdminToken, (request: Request, response: Response) =>
  studioController.create(request, response),
);
studioRoutes.get("/:id", restVerifyAdminToken, (request: Request, response: Response) =>
  studioController.getById(request, response),
);
