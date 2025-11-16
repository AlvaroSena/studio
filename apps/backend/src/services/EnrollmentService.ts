import { BadRequestException } from "../exceptions/BadRequestException";
import { ConflictException } from "../exceptions/ConflictException";
import { NotFoundException } from "../exceptions/NotFoundException";
import { Enrollment } from "../models/Enrollment";
import { IClassRepository } from "../repositories/IClassRepository";
import { IEnrollmentRepository } from "../repositories/IEnrollmentRepository";
import { IStudentRepository } from "../repositories/IStudentRepository";
import { EnrollmentType } from "../schemas/enrollmentSchema";

export class EnrollmentService {
  constructor(
    private repository: IEnrollmentRepository,
    private classRepository: IClassRepository,
    private studentRepository: IStudentRepository,
  ) {}

  async listAll() {
    const enrollments = await this.repository.findAll();

    return enrollments;
  }

  async create(dto: EnrollmentType): Promise<Enrollment> {
    const classExists = await this.classRepository.findById(dto.classId);

    if (!classExists) {
      throw new NotFoundException("Class not found.");
    }

    const enrollments = classExists.getEnrollments();

    if (enrollments && enrollments.length >= 3) {
      throw new BadRequestException("You've reached the limit of three students per class");
    }

    const studentIsAlreadyEnrolled = enrollments?.some((enrollment) => enrollment.studentId === dto.studentId);

    if (studentIsAlreadyEnrolled) {
      throw new ConflictException("The student is already enrolled in this class");
    }

    const studentExists = await this.studentRepository.findById(dto.studentId);

    if (!studentExists) {
      throw new NotFoundException("Student not found.");
    }

    const enrollment = await this.repository.save(new Enrollment(dto));

    return enrollment;
  }
}
