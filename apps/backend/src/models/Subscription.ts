import { subscriptionStatusEnum } from "../database/schema";
import { subscriptionSchema, SubscriptionType } from "../schemas/subscriptionSchema";
import { Model } from "./Model";

export type subscriptionStatus = (typeof subscriptionStatusEnum.enumValues)[number];

export class Subscription extends Model {
  private planId!: string;
  private studentId!: string;
  private status!: subscriptionStatus;
  private startDate!: Date;
  private endDate!: Date;

  constructor({ id, planId, studentId, status, startDate, endDate, updatedAt }: SubscriptionType) {
    super(id, updatedAt);

    subscriptionSchema.parse({ planId, studentId, status, startDate, endDate });
    this.planId = planId;
    this.studentId = studentId;
    this.status = status;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  getPlanId() {
    return this.planId;
  }

  setPlanId(planId: string) {
    this.planId = planId;
  }

  getStudentId() {
    return this.studentId;
  }

  setStudentId(studentId: string) {
    this.studentId = studentId;
  }

  getStatus() {
    return this.status;
  }

  setStatus(status: subscriptionStatus) {
    this.status = status;
  }

  getStartDate() {
    return this.startDate;
  }

  setStartDate(startDate: Date) {
    this.startDate = startDate;
  }

  getEndDate() {
    return this.endDate;
  }

  setEndDate(endDate: Date) {
    this.endDate = endDate;
  }
}
