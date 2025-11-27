import { Subscription } from "../models/Subscription";

export interface ISubscriptionRepository {
  save(subscription: Subscription): Promise<Subscription>;
  findAll(): Promise<Subscription[]>;
  findById(id: string): Promise<Subscription | null>;
  findByStudentId(studentId: string): Promise<Subscription | null>;
  update(subscription: Subscription, id: string): Promise<Subscription>;
  delete(id: string): Promise<void>;
  deleteMany(subscriptionIds: string[]): Promise<void>;
}
