import { eq } from "drizzle-orm";
import { db } from "../database";
import { classes, enrollments, students } from "../database/schema";
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
    const result = await db
      .select({
        id: enrollments.id,
        classId: enrollments.classId,
        studentId: enrollments.studentId,
        studentName: students.name,
        classTitle: classes.title,
        classDate: classes.date,
        classType: classes.type,
      })
      .from(enrollments)
      .leftJoin(students, eq(enrollments.studentId, students.id))
      .leftJoin(classes, eq(enrollments.classId, classes.id));

    return result;
  }

  async findAllByClassId(classId: string): Promise<any[]> {
    const result = await db
      .select({
        id: enrollments.id,
        classId: enrollments.classId,
        studentId: enrollments.studentId,
        studentName: students.name,
        classTitle: classes.title,
        classDate: classes.date,
        classType: classes.type,
      })
      .from(enrollments)
      .where(eq(enrollments.classId, classId))
      .leftJoin(students, eq(enrollments.studentId, students.id))
      .leftJoin(classes, eq(enrollments.classId, classes.id));

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

  async deleteMany(enrollmentsIds: string[]): Promise<void> {
    for (const id of enrollmentsIds) {
      await db.delete(enrollments).where(eq(enrollments.id, id));
    }
  }
}
