import { Router, Request, Response } from "express";
import { StudentController } from "../controllers/StudentController";
import { StudentService } from "../services/StudentService";
import { StudentRepository } from "../repositories/StudentRepository";
import { restVerifyCollaboratorToken } from "../middlewares/restVerifyCollaboratorToken";

export const studentsRoutes = Router();

const studentRepository = new StudentRepository();
const studentService = new StudentService(studentRepository);
const studentController = new StudentController(studentService);

studentsRoutes.get(
  "/",
  restVerifyCollaboratorToken(["admin", "recepcionist"]),
  (request: Request, response: Response) => studentController.listAll(request, response),
);
studentsRoutes.post(
  "/",
  restVerifyCollaboratorToken(["admin", "recepcionist"]),
  (request: Request, response: Response) => studentController.create(request, response),
);
studentsRoutes.get(
  "/:id",
  restVerifyCollaboratorToken(["admin", "recepcionist"]),
  (request: Request, response: Response) => studentController.getById(request, response),
);
studentsRoutes.delete(
  "/delete/:id",
  restVerifyCollaboratorToken(["admin", "recepcionist"]),
  (request: Request, response: Response) => studentController.delete(request, response),
);
