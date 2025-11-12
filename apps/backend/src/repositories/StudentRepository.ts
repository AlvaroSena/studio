import { eq } from "drizzle-orm";
import { db } from "../database";
import { students } from "../database/schema";
import { Student } from "../models/Student";
import { IStudentRepository } from "./IStudentRepository";

export class StudentRepository implements IStudentRepository {
  async save(student: Student): Promise<Student> {
    const [studentCreated] = await db
      .insert(students)
      .values({
        id: student.getId(),
        name: student.getName(),
        birthDate: student.getBirthDate().toString(),
        cpf: student.getCPF(),
        email: student.getEmail(),
        phone: student.getPhone(),
        profession: student.getProfession(),
        registeredBy: student.getRegisteredBy(),
      })
      .returning();

    return new Student({
      id: studentCreated.id,
      name: studentCreated.name,
      avatarUrl: studentCreated.avatarUrl!,
      birthDate: new Date(studentCreated.birthDate),
      cpf: studentCreated.cpf,
      email: studentCreated.email,
      phone: studentCreated.phone,
      profession: studentCreated.profession,
      registeredBy: studentCreated.registeredBy,
    });
  }

  async findAll(): Promise<any[]> {
    const result = await db.select().from(students);

    return result;
  }

  async findById(id: string): Promise<Student | null> {
    const [student] = await db.select().from(students).where(eq(students.id, id));

    if (!student) {
      return null;
    }

    return new Student({
      id: student.id,
      name: student.name,
      avatarUrl: student.avatarUrl!,
      birthDate: new Date(student.birthDate),
      cpf: student.cpf,
      email: student.email,
      phone: student.phone,
      profession: student.profession,
      registeredBy: student.registeredBy,
    });
  }

  async findByEmail(email: string): Promise<Student | null> {
    const [student] = await db.select().from(students).where(eq(students.email, email));

    if (!student) {
      return null;
    }

    return new Student({
      id: student.id,
      name: student.name,
      avatarUrl: student.avatarUrl!,
      birthDate: new Date(student.birthDate),
      cpf: student.cpf,
      email: student.email,
      phone: student.phone,
      profession: student.profession,
      registeredBy: student.registeredBy,
    });
  }

  update(student: Student): Promise<Student> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    await db.delete(students).where(eq(students.id, id));
  }
}
