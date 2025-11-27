import { eq } from "drizzle-orm";
import { db } from "../database";
import { plans, students, subscriptions } from "../database/schema";
import { Subscription } from "../models/Subscription";
import { ISubscriptionRepository } from "./ISubscriptionRepository";

export class SubscriptionRepository implements ISubscriptionRepository {
  async save(subscription: Subscription): Promise<Subscription> {
    await db
      .insert(subscriptions)
      .values({
        id: subscription.getId(),
        planId: subscription.getPlanId(),
        studentId: subscription.getStudentId(),
        status: subscription.getStatus(),
        endDate: new Date(subscription.getEndDate()),
      })
      .returning();

    return subscription;
  }

  async findAll(): Promise<any[]> {
    const result = await db
      .select({
        id: subscriptions.id,
        status: subscriptions.status,
        startDate: subscriptions.startDate,
        endDate: subscriptions.endDate,
        studentId: students.id,
        studentName: students.name,
        planPeriod: plans.period,
      })
      .from(subscriptions)
      .leftJoin(students, eq(subscriptions.studentId, students.id))
      .leftJoin(plans, eq(subscriptions.planId, plans.id));

    return result;
  }

  async findById(id: string): Promise<Subscription | null> {
    const [subscription] = await db.select().from(subscriptions).where(eq(subscriptions.id, id));

    if (!subscription) {
      return null;
    }

    return new Subscription({
      id: subscription.id,
      planId: subscription.planId,
      studentId: subscription.studentId,
      status: subscription.status,
      startDate: subscription.startDate,
      endDate: subscription.endDate,
    });
  }

  async findByStudentId(studentId: string): Promise<Subscription | null> {
    const [subscription] = await db.select().from(subscriptions).where(eq(subscriptions.studentId, studentId));

    if (!subscription) {
      return null;
    }

    return new Subscription({
      id: subscription.id,
      planId: subscription.planId,
      studentId: subscription.studentId,
      status: subscription.status,
      startDate: subscription.startDate,
      endDate: subscription.endDate,
    });
  }

  async update(subscription: Subscription, id: string): Promise<Subscription> {
    await db
      .update(subscriptions)
      .set({
        planId: subscription.getPlanId(),
        studentId: subscription.getStudentId(),
        startDate: subscription.getStartDate(),
        endDate: subscription.getEndDate(),
        status: subscription.getStatus(),
      })
      .where(eq(subscriptions.id, id))
      .returning();

    return subscription;
  }

  async delete(id: string): Promise<void> {
    await db.delete(subscriptions).where(eq(subscriptions.id, id));
  }
}
