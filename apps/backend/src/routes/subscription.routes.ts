import { Router, Request, Response } from "express";
import { SubscriptionController } from "../controllers/SubscriptionController";
import { SubscriptionService } from "../services/SubscriptionService";
import { SubscriptionRepository } from "../repositories/SubscriptionRepository";
import { PlanRepository } from "../repositories/PlanRepository";
import { StudentRepository } from "../repositories/StudentRepository";
import { restVerifyCollaboratorToken } from "../middlewares/restVerifyCollaboratorToken";

export const subscriptionRoutes = Router();

const studentRepository = new StudentRepository();
const planRepository = new PlanRepository();
const subscriptionRepository = new SubscriptionRepository();
const subscriptionService = new SubscriptionService(subscriptionRepository, planRepository, studentRepository);
const subscriptionController = new SubscriptionController(subscriptionService);

subscriptionRoutes.get(
  "/subscriptions",
  restVerifyCollaboratorToken(["admin", "recepcionist"]),
  (request: Request, response: Response) => subscriptionController.listAll(request, response),
);
subscriptionRoutes.post(
  "/subscribe",
  restVerifyCollaboratorToken(["admin", "recepcionist"]),
  (request: Request, response: Response) => subscriptionController.create(request, response),
);
subscriptionRoutes.put(
  "/resubscribe/:id",
  restVerifyCollaboratorToken(["admin", "recepcionist"]),
  (request: Request, response: Response) => subscriptionController.update(request, response),
);
subscriptionRoutes.post(
  "/unsubscribe-many",
  restVerifyCollaboratorToken(["admin", "recepcionist"]),
  (request: Request, response: Response) => subscriptionController.deleteMany(request, response),
);
