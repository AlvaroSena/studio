import { eq } from "drizzle-orm";
import { db } from "../database";
import { plans } from "../database/schema";
import { Plan } from "../models/Plan";
import { IPlanRepository } from "./IPlanRepository";

export class PlanRepository implements IPlanRepository {
  async save(plan: Plan): Promise<Plan> {
    await db
      .insert(plans)
      .values({
        id: plan.getId(),
        period: plan.getPeriod(),
        frequency: plan.getFrequency(),
        monthlyPriceInCents: plan.getMonthlyPriceInCents(),
        totalPriceInCents: plan.getTotalPriceInCents(),
      })
      .returning();

    return plan;
  }

  async findAll(): Promise<any[]> {
    const result = await db.select().from(plans);

    return result;
  }

  async findById(id: string): Promise<Plan | null> {
    const [plan] = await db.select().from(plans).where(eq(plans.id, id));

    return new Plan({
      id: plan.id,
      period: plan.period,
      frequency: plan.frequency,
      monthlyPriceInCents: plan.monthlyPriceInCents,
      totalPriceInCents: plan.totalPriceInCents,
    });
  }

  async update(plan: Plan, id: string): Promise<Plan> {
    await db
      .update(plans)
      .set({
        period: plan.getPeriod(),
        frequency: plan.getFrequency(),
        monthlyPriceInCents: plan.getMonthlyPriceInCents(),
        totalPriceInCents: plan.getTotalPriceInCents(),
      })
      .where(eq(plans.id, id))
      .returning();

    return plan;
  }

  async delete(id: string): Promise<void> {
    await db.delete(plans).where(eq(plans.id, id));
  }
}
