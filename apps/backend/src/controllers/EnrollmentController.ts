import { Request, Response, NextFunction } from "express";
import { EnrollmentService } from "../services/EnrollmentService";

export class EnrollmentController {
  constructor(private enrollmentService: EnrollmentService) {}

  async listAll(request: Request, response: Response, next: NextFunction) {
    try {
      const enrollments = await this.enrollmentService.listAll();

      return response.json(enrollments);
    } catch (err) {
      next(err);
    }
  }

  async listByClassId(request: Request, response: Response, next: NextFunction) {
    try {
      const classId = request.params.classId;

      const enrollments = await this.enrollmentService.listByClassId(classId);

      return response.json(enrollments);
    } catch (err) {
      next(err);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const body = request.body;

      const enrollment = await this.enrollmentService.create(body);

      return response.status(201).json(enrollment);
    } catch (err) {
      next(err);
    }
  }

  async getById(request: Request, response: Response, next: NextFunction) {
    try {
      const id = request.params.id;

      const enrollment = await this.enrollmentService.getById(id);

      return response.json(enrollment);
    } catch (err) {
      next(err);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = request.params.id;
      const body = request.body;

      const enrollment = await this.enrollmentService.update(body, id);

      return response.json(enrollment);
    } catch (err) {
      next(err);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const id = request.params.id;

      await this.enrollmentService.remove(id);

      return response.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  async deleteMany(request: Request, response: Response) {
    const { enrollmentsIds } = request.body;

    await this.enrollmentService.removeMany(enrollmentsIds);

    return response.status(204).send();
  }
}
