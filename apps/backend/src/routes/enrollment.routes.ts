import { Router, Request, Response, NextFunction } from "express";
import { EnrollmentController } from "../controllers/EnrollmentController";
import { EnrollmentService } from "../services/EnrollmentService";
import { EnrollmentRepository } from "../repositories/EnrollmentRepository";
import { ClassRepository } from "../repositories/ClassRepository";
import { StudentRepository } from "../repositories/StudentRepository";
import { SubscriptionRepository } from "../repositories/SubscriptionRepository";
import { restVerifyCollaboratorToken } from "../middlewares/restVerifyCollaboratorToken";

export const enrollmentRoutes = Router();

const subscriptionRepository = new SubscriptionRepository();
const studentRepository = new StudentRepository();
const classRepository = new ClassRepository();
const enrollmentRepository = new EnrollmentRepository();
const enrollmentService = new EnrollmentService(
  enrollmentRepository,
  classRepository,
  studentRepository,
  subscriptionRepository,
);
const enrollmentController = new EnrollmentController(enrollmentService);

enrollmentRoutes.get(
  "/",
  restVerifyCollaboratorToken(["admin"]),
  (request: Request, response: Response, next: NextFunction) => enrollmentController.listAll(request, response, next),
);
enrollmentRoutes.get(
  "/classes/:classId",
  restVerifyCollaboratorToken(["admin", "recepcionist"]),
  (request: Request, response: Response, next: NextFunction) =>
    enrollmentController.listByClassId(request, response, next),
);
enrollmentRoutes.post(
  "/",
  restVerifyCollaboratorToken(["admin", "recepcionist"]),
  (request: Request, response: Response, next: NextFunction) => enrollmentController.create(request, response, next),
);
enrollmentRoutes.get("/:id", (request: Request, response: Response, next: NextFunction) =>
  enrollmentController.getById(request, response, next),
);
enrollmentRoutes.put(
  "/update/:id",
  restVerifyCollaboratorToken(["admin", "recepcionist"]),
  (request: Request, response: Response, next: NextFunction) => enrollmentController.update(request, response, next),
);
enrollmentRoutes.delete(
  "/delete/:id",
  restVerifyCollaboratorToken(["admin", "recepcionist"]),
  (request: Request, response: Response, next: NextFunction) => enrollmentController.delete(request, response, next),
);
