import { Router, Request, Response } from "express";
import { EnrollmentController } from "../controllers/EnrollmentController";
import { EnrollmentService } from "../services/EnrollmentService";
import { EnrollmentRepository } from "../repositories/EnrollmentRepository";
import { ClassRepository } from "../repositories/ClassRepository";
import { StudentRepository } from "../repositories/StudentRepository";

export const enrollmentRoutes = Router();

const studentRepository = new StudentRepository();
const classRepository = new ClassRepository();
const enrollmentRepository = new EnrollmentRepository();
const enrollmentService = new EnrollmentService(enrollmentRepository, classRepository, studentRepository);
const enrollmentController = new EnrollmentController(enrollmentService);

enrollmentRoutes.get("/", (request: Request, response: Response) => enrollmentController.listAll(request, response));
enrollmentRoutes.post("/", (request: Request, response: Response) => enrollmentController.create(request, response));
