import { Router, Request, Response } from "express";
import { restVerifyAdminToken } from "../middlewares/restVerifyAdminToken";
import { StudioScheduleController } from "../controllers/StudioScheduleController";
import { StudioScheduleService } from "../services/StudioScheduleService";
import { StudioScheduleRepository } from "../repositories/StudioScheduleRepository";
import { StudioRepository } from "../repositories/StudioRepository";

export const studioScheduleRoutes = Router();

const studioRepository = new StudioRepository();
const studioScheduleRepository = new StudioScheduleRepository();
const studioScheduleService = new StudioScheduleService(studioScheduleRepository, studioRepository);
const studioScheduleController = new StudioScheduleController(studioScheduleService);

studioScheduleRoutes.post("/", restVerifyAdminToken, (request: Request, response: Response) =>
  studioScheduleController.create(request, response),
);

studioScheduleRoutes.get("/studio/:studioId", restVerifyAdminToken, (request: Request, response: Response) =>
  studioScheduleController.listAll(request, response),
);

studioScheduleRoutes.put("/:id", restVerifyAdminToken, (request: Request, response: Response) =>
  studioScheduleController.update(request, response),
);

studioScheduleRoutes.delete("/:id", restVerifyAdminToken, (request: Request, response: Response) =>
  studioScheduleController.delete(request, response),
);
