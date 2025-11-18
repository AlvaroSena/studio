import { SubscriptionPayment } from "../models/SubscriptionPayment";

export interface ISubscriptionPaymentRepository {
  save(subscriptionPayment: SubscriptionPayment): Promise<SubscriptionPayment>;
  findAll(): Promise<SubscriptionPayment[]>;
  findById(id: string): Promise<SubscriptionPayment | null>;
  update(subscriptionPayment: SubscriptionPayment, id: string): Promise<SubscriptionPayment>;
  delete(id: string): Promise<void>;
}
