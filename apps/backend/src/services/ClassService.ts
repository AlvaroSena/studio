import { BadRequestException } from "../exceptions/BadRequestException";
import { NotFoundException } from "../exceptions/NotFoundException";
import { Class } from "../models/Class";
import { IClassRepository } from "../repositories/IClassRepository";
import { ICollaboratorRepository } from "../repositories/ICollaboratorRepository";
import { IStudioRepository } from "../repositories/IStudioRepository";
import { ClassType } from "../schemas/classSchema";

export class ClassService {
  constructor(
    private repository: IClassRepository,
    private studioRepository: IStudioRepository,
    private collaboratorRepository: ICollaboratorRepository,
  ) {}

  async listAll() {
    const classes = await this.repository.findAll();

    return classes;
  }

  async create(dto: ClassType) {
    const studioExists = await this.studioRepository.findById(dto.studioId);

    if (!studioExists) {
      throw new NotFoundException("Studio not found");
    }

    const instructorExists = await this.collaboratorRepository.findById(dto.instructorId);

    if (!instructorExists) {
      throw new NotFoundException("Instructor not found.");
    }

    if (instructorExists.getRole() !== "instructor") {
      throw new BadRequestException("The informed collaborator isn't an instructor");
    }

    const classCreated = await this.repository.save(new Class(dto));

    return classCreated;
  }

  async getById(id: string) {
    const classExists = await this.repository.findById(id);

    if (!classExists) {
      throw new NotFoundException("Class not found.");
    }

    return classExists;
  }

  async update(dto: ClassType, id: string) {
    const classExists = await this.repository.findById(id);

    if (!classExists) {
      throw new NotFoundException("Class not found.");
    }

    const rescheduledClass = await this.repository.update(new Class(dto), id);

    return rescheduledClass;
  }

  async remove(id: string) {
    const classExists = await this.repository.findById(id);

    if (!classExists) {
      throw new NotFoundException("Class not found.");
    }

    await this.repository.delete(id);
  }
}
