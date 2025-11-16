import { Router, Request, Response } from "express";
import { ClassController } from "../controllers/ClassController";
import { ClassService } from "../services/ClassService";
import { ClassRepository } from "../repositories/ClassRepository";
import { StudioRepository } from "../repositories/StudioRepository";
import { CollaboratorRepository } from "../repositories/CollaboratorRepository";

export const classRoutes = Router();

const collaboratorRepository = new CollaboratorRepository();
const studioRepository = new StudioRepository();
const classRepository = new ClassRepository();
const classService = new ClassService(classRepository, studioRepository, collaboratorRepository);
const classController = new ClassController(classService);

classRoutes.get("/", (request: Request, response: Response) => classController.listAll(request, response));
classRoutes.get("/studios/:studioId", (request: Request, response: Response) =>
  classController.listAllByStudioId(request, response),
);
classRoutes.get("/instructors/:instructorId", (request: Request, response: Response) =>
  classController.listAllByInstructorId(request, response),
);
classRoutes.post("/", (request: Request, response: Response) => classController.create(request, response));
classRoutes.get("/:id", (request: Request, response: Response) => classController.getById(request, response));
classRoutes.put("/reschedule/:id", (request: Request, response: Response) => classController.update(request, response));
classRoutes.delete("/delete/:id", (request: Request, response: Response) => classController.delete(request, response));
