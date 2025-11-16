import { eq } from "drizzle-orm";
import { db } from "../database";
import { enrollments } from "../database/schema";
import { Enrollment } from "../models/Enrollment";
import { IEnrollmentRepository } from "./IEnrollmentRepository";

export class EnrollmentRepository implements IEnrollmentRepository {
  async save(enrollment: Enrollment): Promise<Enrollment> {
    await db
      .insert(enrollments)
      .values({
        id: enrollment.getId(),
        classId: enrollment.getClassId(),
        studentId: enrollment.getStudentId(),
      })
      .returning();

    return enrollment;
  }

  async findAll(): Promise<any[]> {
    const result = await db.select().from(enrollments);

    return result;
  }

  async findAllByClassId(classId: string): Promise<any[]> {
    const result = await db.select().from(enrollments).where(eq(enrollments.classId, classId));

    return result;
  }

  async findById(id: string): Promise<Enrollment | null> {
    const [enrollment] = await db.select().from(enrollments).where(eq(enrollments.id, id));

    if (!enrollment) {
      return null;
    }

    return new Enrollment({
      id: enrollment.id,
      classId: enrollment.classId,
      studentId: enrollment.studentId,
    });
  }

  async update(enrollment: Enrollment, id: string): Promise<Enrollment> {
    await db
      .update(enrollments)
      .set({
        classId: enrollment.getClassId(),
        studentId: enrollment.getStudentId(),
      })
      .where(eq(enrollments.id, id))
      .returning();

    return enrollment;
  }

  async delete(id: string): Promise<void> {
    await db.delete(enrollments).where(eq(enrollments.id, id));
  }
}
