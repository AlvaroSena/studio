import { eq } from "drizzle-orm";
import { db } from "../database";
import { classes } from "../database/schema";
import { Class } from "../models/Class";
import { IClassRepository } from "./IClassRepository";

export class ClassRepository implements IClassRepository {
  async save(data: Class): Promise<Class> {
    await db
      .insert(classes)
      .values({
        id: data.getId(),
        studioId: data.getStudioId(),
        instructorId: data.getInstructorId(),
        date: new Date(data.getDate()),
        status: data.getStatus(),
        type: data.getType(),
      })
      .returning();

    return data;
  }

  async findAll(): Promise<any[]> {
    const result = await db.select().from(classes);

    return result;
  }

  async findById(id: string): Promise<Class | null> {
    const [classFound] = await db.select().from(classes).where(eq(classes.id, id));

    return new Class({
      id: classFound.id,
      studioId: classFound.studioId,
      instructorId: classFound.instructorId,
      date: classFound.date,
      status: classFound.status,
      type: classFound.type,
    });
  }

  async update(data: Class, id: string): Promise<Class> {
    // await db.update(classes).set({
    //   studentId: data.getStudioId(),
    //   instructorId: data.getInstructorId(),
    // })
    throw new Error("");
  }

  async delete(id: string): Promise<void> {
    await db.delete(classes).where(eq(classes.id, id));
  }
}
