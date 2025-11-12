import { ConflictException } from "../exceptions/ConflictException";
import { NotFoundException } from "../exceptions/NotFoundException";
import { Student } from "../models/Student";
import { IStudentRepository } from "../repositories/IStudentRepository";
import { StudentType } from "../schemas/studentSchema";

export class StudentService {
  constructor(private repository: IStudentRepository) {}

  async listAll() {
    const students = await this.repository.findAll();

    return students;
  }

  async create(dto: StudentType, collaboratorId: string): Promise<Student> {
    const studentExists = await this.repository.findByEmail(dto.email);

    if (studentExists) {
      throw new ConflictException("Student already exists.");
    }

    const student = new Student({
      name: dto.name,
      birthDate: dto.birthDate,
      cpf: dto.cpf,
      email: dto.email,
      phone: dto.phone,
      profession: dto.profession,
      registeredBy: collaboratorId,
    });

    const createdStudent = await this.repository.save(student);

    return createdStudent;
  }

  async getById(id: string) {
    const student = await this.repository.findById(id);

    if (!student) {
      throw new NotFoundException("Student not found.");
    }

    return {
      student: {
        id: student.getId(),
        name: student.getName(),
        avatarUrl: student.getAvatarUrl(),
        birthDate: student.getBirthDate(),
        cpf: student.getCPF(),
        email: student.getEmail(),
        phone: student.getPhone(),
        profession: student.getProfession(),
        registeredBy: student.getRegisteredBy(),
      },
    };
  }

  async remove(id: string): Promise<void> {
    const student = await this.repository.findById(id);

    if (!student) {
      throw new NotFoundException("Student not found.");
    }

    await this.repository.delete(id);
  }
}
