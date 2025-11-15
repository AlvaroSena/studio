import { Request, Response } from "express";
import { ClassService } from "../services/ClassService";

export class ClassController {
  constructor(private classService: ClassService) {}

  async listAll(request: Request, response: Response) {
    const classes = await this.classService.listAll();

    return response.json(classes);
  }

  async create(request: Request, response: Response) {
    const body = request.body;

    const createdClass = await this.classService.create(body);

    return response.status(201).json(createdClass);
  }

  async getById(request: Request, response: Response) {
    const id = request.params.id;

    const classFound = await this.classService.getById(id);

    return response.json(classFound);
  }
}
