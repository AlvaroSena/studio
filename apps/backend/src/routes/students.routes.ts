import { Router, Request, Response } from "express";
import { StudentController } from "../controllers/StudentController";
import { StudentService } from "../services/StudentService";
import { StudentRepository } from "../repositories/StudentRepository";
import { restVerifyAdminToken } from "../middlewares/restVerifyAdminToken";

export const studentsRoutes = Router();

const studentRepository = new StudentRepository();
const studentService = new StudentService(studentRepository);
const studentController = new StudentController(studentService);

studentsRoutes.get("/", restVerifyAdminToken, (request, response) => studentController.listAll(request, response));
studentsRoutes.post("/", restVerifyAdminToken, (request, response) => studentController.create(request, response));
studentsRoutes.get("/:id", restVerifyAdminToken, (request, response) => studentController.getById(request, response));
studentsRoutes.delete("/delete/:id", restVerifyAdminToken, (request, response) =>
  studentController.delete(request, response),
);
