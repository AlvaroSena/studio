import { Router, Request, Response } from "express";
import { StudentController } from "../controllers/StudentController";
import { StudentService } from "../services/StudentService";
import { StudentRepository } from "../repositories/StudentRepository";
import { restVerifyCollaboratorToken } from "../middlewares/restVerifyCollaboratorToken";

export const studentsRoutes = Router();

const studentRepository = new StudentRepository();
const studentService = new StudentService(studentRepository);
const studentController = new StudentController(studentService);

studentsRoutes.get("/", restVerifyCollaboratorToken, (request, response) =>
  studentController.listAll(request, response),
);
studentsRoutes.post("/", restVerifyCollaboratorToken, (request, response) =>
  studentController.create(request, response),
);
studentsRoutes.get("/:id", restVerifyCollaboratorToken, (request, response) =>
  studentController.getById(request, response),
);
studentsRoutes.delete("/delete/:id", restVerifyCollaboratorToken, (request, response) =>
  studentController.delete(request, response),
);
