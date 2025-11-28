import { Subscription, subscriptionStatus } from "../models/Subscription";

export interface ISubscriptionRepository {
  save(subscription: Subscription): Promise<Subscription>;
  findAll(): Promise<Subscription[]>;
  findById(id: string): Promise<Subscription | null>;
  findByStudentId(studentId: string): Promise<Subscription | null>;
  update(subscription: Subscription, id: string): Promise<Subscription>;
  updateStatus(status: subscriptionStatus, id: string): Promise<void>;
  delete(id: string): Promise<void>;
  deleteMany(subscriptionIds: string[]): Promise<void>;
}
