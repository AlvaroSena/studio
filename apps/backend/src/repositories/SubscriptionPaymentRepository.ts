import { db } from "../database";
import { subscriptionsPayments } from "../database/schema";
import { SubscriptionPayment } from "../models/SubscriptionPayment";
import { ISubscriptionPaymentRepository } from "./ISubscriptionPaymentRepository";

export class SubscriptionPaymentRepository implements ISubscriptionPaymentRepository {
  async save(subscriptionPayment: SubscriptionPayment): Promise<SubscriptionPayment> {
    await db
      .insert(subscriptionsPayments)
      .values({
        id: subscriptionPayment.getId(),
        subscriptionId: subscriptionPayment.getSubscriptionId(),
        amountInCents: subscriptionPayment.getAmountInCents(),
        dueDate: subscriptionPayment.getDueDate(),
        paymentMethod: subscriptionPayment.getPaymentMethod(),
      })
      .returning();

    return subscriptionPayment;
  }

  findAll(): Promise<SubscriptionPayment[]> {
    throw new Error("Method not implemented.");
  }

  findById(id: string): Promise<SubscriptionPayment | null> {
    throw new Error("Method not implemented.");
  }

  update(subscriptionPayment: SubscriptionPayment, id: string): Promise<SubscriptionPayment> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
