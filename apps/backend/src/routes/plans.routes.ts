import { Router, Request, Response } from "express";
import { PlanController } from "../controllers/PlanController";
import { PlanService } from "../services/PlanService";
import { PlanRepository } from "../repositories/PlanRepository";

export const planRoutes = Router();

const planRepository = new PlanRepository();
const planService = new PlanService(planRepository);
const planController = new PlanController(planService);

planRoutes.get("/", (request: Request, response: Response) => planController.listAll(request, response));
planRoutes.post("/", (request: Request, response: Response) => planController.create(request, response));
planRoutes.get("/:id", (request: Request, response: Response) => planController.getById(request, response));
planRoutes.put("/update/:id", (request: Request, response: Response) => planController.update(request, response));
planRoutes.delete("/delete/:id", (request: Request, response: Response) => planController.delete(request, response));
