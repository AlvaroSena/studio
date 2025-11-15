import { eq } from "drizzle-orm";
import { db } from "../database";
import { studioSchedule } from "../database/schema";
import { StudioSchedule } from "../models/StudioSchedule";
import { IStudioScheduleRepository } from "./IStudioScheduleRepository";
import { String } from "aws-sdk/clients/appstream";

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

  async findAllByStudioId(studioId: string): Promise<any[]> {
    const result = await db.select().from(studioSchedule).where(eq(studioSchedule.studioId, studioId));

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

  async update(schedule: StudioSchedule, id: String): Promise<StudioSchedule> {
    await db
      .update(studioSchedule)
      .set({
        dayOfWeek: schedule.getDayOfWeek(),
        openTime: schedule.getOpenTime(),
        closeTime: schedule.getCloseTime(),
      })
      .where(eq(studioSchedule.id, id))
      .returning();

    return schedule;
  }

  async delete(id: string): Promise<void> {
    await db.delete(studioSchedule).where(eq(studioSchedule.id, id));
  }
}
