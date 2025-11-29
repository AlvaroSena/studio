import { BadRequestException } from "../exceptions/BadRequestException";
import { ConflictException } from "../exceptions/ConflictException";
import { NotFoundException } from "../exceptions/NotFoundException";
import { Enrollment } from "../models/Enrollment";
import { IClassRepository } from "../repositories/IClassRepository";
import { IEnrollmentRepository } from "../repositories/IEnrollmentRepository";
import { IStudentRepository } from "../repositories/IStudentRepository";
import { ISubscriptionRepository } from "../repositories/ISubscriptionRepository";
import { EnrollmentType } from "../schemas/enrollmentSchema";

export class EnrollmentService {
  constructor(
    private repository: IEnrollmentRepository,
    private classRepository: IClassRepository,
    private studentRepository: IStudentRepository,
    private subscriptionRepository: ISubscriptionRepository,
  ) {}

  async listAll() {
    const enrollments = await this.repository.findAll();

    return enrollments;
  }

  async create(dto: EnrollmentType): Promise<Enrollment> {
    const classExists = await this.classRepository.findByIdWithEnrollments(dto.classId);

    if (!classExists) {
      throw new NotFoundException("Class not found.");
    }

    const enrollments = classExists.getEnrollments();

    if (enrollments && enrollments.length >= 3) {
      throw new BadRequestException("Você atingiu o limite de 3 alunos por aula");
    }

    const isStudentAlreadyEnrolled = enrollments?.some((enrollment) => enrollment.studentId === dto.studentId);

    if (isStudentAlreadyEnrolled) {
      throw new ConflictException("O aluno já está matriculado nesta aula");
    }

    const doesStudentHaveASubscription = await this.subscriptionRepository.findByStudentId(dto.studentId);

    if (!doesStudentHaveASubscription || doesStudentHaveASubscription.getStatus() !== "ACTIVE") {
      throw new BadRequestException("O aluno precisa ter uma assinatura ativa para se matricular em uma aula");
    }

    const studentExists = await this.studentRepository.findById(dto.studentId);

    if (!studentExists) {
      throw new NotFoundException("Aluno não encontrado");
    }

    const enrollment = await this.repository.save(new Enrollment(dto));

    return enrollment;
  }

  async listByClassId(classId: string) {
    const classExists = await this.classRepository.findById(classId);

    if (!classExists) {
      throw new NotFoundException("Class not found.");
    }

    const enrollments = await this.repository.findAllByClassId(classId);

    return enrollments;
  }

  async getById(id: string) {
    const enrollment = await this.repository.findById(id);

    if (!enrollment) {
      throw new NotFoundException("Enrollment not found.");
    }

    return enrollment;
  }

  async update(dto: EnrollmentType, id: string): Promise<Enrollment> {
    const enrollmentExists = await this.repository.findById(id);

    if (!enrollmentExists) {
      throw new NotFoundException("Enrollment not found.");
    }

    const updatedEnrollment = await this.repository.update(new Enrollment(dto), id);

    return updatedEnrollment;
  }

  async remove(id: string): Promise<void> {
    const enrollmentExists = await this.repository.findById(id);

    if (!enrollmentExists) {
      throw new NotFoundException("Enrollment not found.");
    }

    await this.repository.delete(id);
  }

  async removeMany(enrollmentsIds: string[]) {
    if (!enrollmentsIds) {
      throw new BadRequestException("IDs weren't provided");
    }

    await this.repository.deleteMany(enrollmentsIds);
  }
}
