import { eq } from "drizzle-orm";
import { db } from "../database";
import { studioSchedule } from "../database/schema";
import { StudioSchedule } from "../models/StudioSchedule";
import { IStudioScheduleRepository } from "./IStudioScheduleRepository";

export class StudioScheduleRepository implements IStudioScheduleRepository {
  async save(schedule: StudioSchedule): Promise<StudioSchedule> {
    await db
      .insert(studioSchedule)
      .values({
        id: schedule.getId(),
        studioId: schedule.getStudioId(),
        dayOfWeek: schedule.getDayOfWeek(),
        openTime: schedule.getOpenTime(),
        closeTime: schedule.getCloseTime(),
      })
      .returning();

    return schedule;
  }

  async findAll(): Promise<any[]> {
    const result = await db.select().from(studioSchedule);

    return result;
  }

  async findById(id: string): Promise<StudioSchedule | null> {
    const [schedule] = await db.select().from(studioSchedule).where(eq(studioSchedule.id, id));

    return new StudioSchedule({
      id: schedule.id,
      studioId: schedule.studioId,
      dayOfWeek: schedule.dayOfWeek,
      openTime: schedule.openTime,
      closeTime: schedule.closeTime,
    });
  }

  update(studioSchedule: StudioSchedule): Promise<StudioSchedule> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    await db.delete(studioSchedule).where(eq(studioSchedule.id, id));
  }
}
