import { Request, Response } from "express";
import { EnrollmentService } from "../services/EnrollmentService";

export class EnrollmentController {
  constructor(private enrollmentService: EnrollmentService) {}

  async listAll(request: Request, response: Response) {
    const enrollments = await this.enrollmentService.listAll();

    return response.json(enrollments);
  }

  async listByClassId(request: Request, response: Response) {
    const classId = request.params.classId;

    const enrollments = await this.enrollmentService.listByClassId(classId);

    return response.json(enrollments);
  }

  async create(request: Request, response: Response) {
    const body = request.body;

    const enrollment = await this.enrollmentService.create(body);

    return response.status(201).json(enrollment);
  }

  async getById(request: Request, response: Response) {
    const id = request.params.id;

    const enrollment = await this.enrollmentService.getById(id);

    return response.json(enrollment);
  }

  async update(request: Request, response: Response) {
    const id = request.params.id;
    const body = request.body;

    const enrollment = await this.enrollmentService.update(body, id);

    return response.json(enrollment);
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id;

    await this.enrollmentService.remove(id);

    return response.status(204).send();
  }
}
