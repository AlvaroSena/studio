import { eq, sql } from "drizzle-orm";
import { db } from "../database";
import { classes, enrollments } from "../database/schema";
import { Class } from "../models/Class";
import { IClassRepository } from "./IClassRepository";
import { EnrollmentType } from "../schemas/enrollmentSchema";

export class ClassRepository implements IClassRepository {
  async save(data: Class): Promise<Class> {
    await db
      .insert(classes)
      .values({
        id: data.getId(),
        title: data.getTitle(),
        studioId: data.getStudioId(),
        instructorId: data.getInstructorId(),
        date: new Date(data.getDate()),
        status: data.getStatus(),
        type: data.getType(),
        color: data.getColor(),
      })
      .returning();

    return data;
  }

  async findAll(): Promise<any[]> {
    const result = await db.select().from(classes);

    return result;
  }

  async findAllByStudioId(studioId: string): Promise<any[]> {
    const result = await db.select().from(classes).where(eq(classes.studioId, studioId));

    return result;
  }

  async findAllByInstructorId(instructorId: string): Promise<any[]> {
    const result = await db.select().from(classes).where(eq(classes.instructorId, instructorId));

    return result;
  }

  async findById(id: string): Promise<Class | null> {
    const [classFound] = await db.select().from(classes).where(eq(classes.id, id));

    return new Class({
      id: classFound.id,
      title: classFound.title,
      studioId: classFound.studioId,
      instructorId: classFound.instructorId,
      date: classFound.date,
      status: classFound.status,
      type: classFound.type,
      color: classFound.color,
    });
  }

  async findByIdWithEnrollments(id: string): Promise<Class | null> {
    const [classFound] = await db
      .select({
        class: classes,
        enrollments: sql`
        json_agg(
          json_build_object(
            'id', ${enrollments.id},
            'classId', ${enrollments.classId},
            'studentId', ${enrollments.studentId},
            'createdAt', ${enrollments.createdAt},
            'updatedAt', ${enrollments.updatedAt}
          )
        )
      `.as("enrollments"),
      })
      .from(classes)
      .leftJoin(enrollments, eq(classes.id, enrollments.classId))
      .where(eq(classes.id, id))
      .groupBy(classes.id);

    return new Class({
      id: classFound.class.id,
      title: classFound.class.title,
      studioId: classFound.class.studioId,
      instructorId: classFound.class.instructorId,
      date: classFound.class.date,
      status: classFound.class.status,
      type: classFound.class.type,
      color: classFound.class.color,
      enrollments: classFound.enrollments as EnrollmentType[],
    });
  }

  async update(data: Class, id: string): Promise<Class> {
    await db
      .update(classes)
      .set({
        studioId: data.getStudioId(),
        instructorId: data.getInstructorId(),
        date: new Date(data.getDate()),
        status: data.getStatus(),
        type: data.getType(),
        color: data.getColor(),
      })
      .where(eq(classes.id, id))
      .returning();

    return data;
  }

  async delete(id: string): Promise<void> {
    await db.delete(classes).where(eq(classes.id, id));
  }
}
