import { Student } from "../models/Student";

export interface IStudentRepository {
  save(student: Student): Promise<Student>;
  findAll(): Promise<Student[]>;
  findById(id: string): Promise<Student | null>;
  findByEmail(email: string): Promise<Student | null>;
  update(student: Student): Promise<Student>;
  delete(id: string): Promise<void>;
}
