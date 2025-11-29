import { Router, Request, Response } from "express";
import { restVerifyCollaboratorToken } from "../middlewares/restVerifyCollaboratorToken";
import { StudioScheduleController } from "../controllers/StudioScheduleController";
import { StudioScheduleService } from "../services/StudioScheduleService";
import { StudioScheduleRepository } from "../repositories/StudioScheduleRepository";
import { StudioRepository } from "../repositories/StudioRepository";

export const studioScheduleRoutes = Router();

const studioRepository = new StudioRepository();
const studioScheduleRepository = new StudioScheduleRepository();
const studioScheduleService = new StudioScheduleService(studioScheduleRepository, studioRepository);
const studioScheduleController = new StudioScheduleController(studioScheduleService);

studioScheduleRoutes.post(
  "/",
  restVerifyCollaboratorToken(["admin", "recepcionist"]),
  (request: Request, response: Response) => studioScheduleController.create(request, response),
);

studioScheduleRoutes.get("/studios/:studioId", (request: Request, response: Response) =>
  studioScheduleController.listAll(request, response),
);

studioScheduleRoutes.put(
  "/update",
  restVerifyCollaboratorToken(["admin", "recepcionist"]),
  (request: Request, response: Response) => studioScheduleController.update(request, response),
);

studioScheduleRoutes.delete("/:id", restVerifyCollaboratorToken(["admin"]), (request: Request, response: Response) =>
  studioScheduleController.delete(request, response),
);
