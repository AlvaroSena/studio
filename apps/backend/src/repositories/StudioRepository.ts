import { eq } from "drizzle-orm";
import { db } from "../database";
import { studios } from "../database/schema";
import { Studio } from "../models/Studio";
import { IStudioRepository } from "./IStudioRepository";

export class StudioRepository implements IStudioRepository {
  async save(studio: Studio): Promise<Studio> {
    const [studioCreated] = await db
      .insert(studios)
      .values({
        id: studio.getId(),
        name: studio.getName(),
        address: studio.getAddress(),
      })
      .returning();

    return new Studio({
      id: studioCreated.id,
      name: studioCreated.name,
      address: studioCreated.address,
    });
  }

  async findAll(): Promise<any[]> {
    const result = await db.select().from(studios);

    return result;
  }

  async findById(id: string): Promise<Studio | null> {
    const [studio] = await db.select().from(studios).where(eq(studios.id, id));

    if (!studio) {
      return null;
    }

    return new Studio({
      id: studio.id,
      name: studio.name,
      address: studio.address,
    });
  }

  update(studio: Studio): Promise<Studio> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    await db.delete(studios).where(eq(studios.id, id));
  }
}
