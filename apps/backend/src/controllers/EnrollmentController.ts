import { Request, Response } from "express";
import { EnrollmentService } from "../services/EnrollmentService";

export class EnrollmentController {
  constructor(private enrollmentService: EnrollmentService) {}

  async listAll(request: Request, response: Response) {
    const enrollments = await this.enrollmentService.listAll();

    return response.json(enrollments);
  }

  async create(request: Request, response: Response) {
    const body = request.body;

    const enrollment = await this.enrollmentService.create(body);

    return response.status(201).json(enrollment);
  }
}
