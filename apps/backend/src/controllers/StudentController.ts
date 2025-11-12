import { Request, Response } from "express";
import { StudentService } from "../services/StudentService";

export class StudentController {
  constructor(private studentService: StudentService) {}

  async listAll(request: Request, response: Response) {
    const students = await this.studentService.listAll();

    return response.json(students);
  }

  async create(request: Request, response: Response) {
    const { sub: collaboratorId } = request.user as { sub: string };
    const data = request.body;

    const student = await this.studentService.create(data, collaboratorId);

    return response.status(201).json({ studentId: student.getId() });
  }

  async getById(request: Request, response: Response) {
    const id = request.params.id;

    const student = await this.studentService.getById(id);

    return response.json(student);
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id;

    await this.studentService.remove(id);

    return response.status(204).send();
  }
}
