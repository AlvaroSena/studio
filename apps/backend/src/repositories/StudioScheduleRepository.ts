import { sql, eq } from "drizzle-orm";
import { db } from "../database";
import { studioSchedule } from "../database/schema";
import { StudioSchedule } from "../models/StudioSchedule";
import { IStudioScheduleRepository } from "./IStudioScheduleRepository";

export class StudioScheduleRepository implements IStudioScheduleRepository {
  async save(schedule: StudioSchedule[]): Promise<StudioSchedule[]> {
    const data = schedule.map((item) => ({
      id: item.getId(),
      studioId: item.getStudioId(),
      dayOfWeek: item.getDayOfWeek(),
      openTime: item.getOpenTime(),
      closeTime: item.getCloseTime(),
    }));

    await db.insert(studioSchedule).values(data).returning();

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
      enabled: schedule.enabled,
    });
  }

  async update(items: StudioSchedule[]) {
    for (const item of items) {
      await db
        .update(studioSchedule)
        .set({
          openTime: item.getOpenTime(),
          closeTime: item.getCloseTime(),
          dayOfWeek: item.getDayOfWeek(),
          enabled: item.getEnabled(),
        })
        .where(eq(studioSchedule.id, item.getId()));
    }

    return items;
  }

  async delete(id: string): Promise<void> {
    await db.delete(studioSchedule).where(eq(studioSchedule.id, id));
  }
}
