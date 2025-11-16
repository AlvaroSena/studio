import { Enrollment } from "../models/Enrollment";

export interface IEnrollmentRepository {
  save(enrollment: Enrollment): Promise<Enrollment>;
  findAll(): Promise<Enrollment[]>;
  findAllByClassId(classId: string): Promise<Enrollment[]>;
  findById(id: string): Promise<Enrollment | null>;
  update(enrollment: Enrollment, id: string): Promise<Enrollment>;
  delete(id: string): Promise<void>;
}
