import { Router, Request, Response } from "express";
import { EnrollmentController } from "../controllers/EnrollmentController";
import { EnrollmentService } from "../services/EnrollmentService";
import { EnrollmentRepository } from "../repositories/EnrollmentRepository";
import { ClassRepository } from "../repositories/ClassRepository";
import { StudentRepository } from "../repositories/StudentRepository";
import { SubscriptionRepository } from "../repositories/SubscriptionRepository";

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

enrollmentRoutes.get("/", (request: Request, response: Response) => enrollmentController.listAll(request, response));
enrollmentRoutes.get("/classes/:classId", (request: Request, response: Response) =>
  enrollmentController.listByClassId(request, response),
);
enrollmentRoutes.post("/", (request: Request, response: Response) => enrollmentController.create(request, response));
enrollmentRoutes.get("/:id", (request: Request, response: Response) => enrollmentController.getById(request, response));
enrollmentRoutes.put("/update/:id", (request: Request, response: Response) =>
  enrollmentController.update(request, response),
);
enrollmentRoutes.delete("/delete/:id", (request: Request, response: Response) =>
  enrollmentController.delete(request, response),
);
