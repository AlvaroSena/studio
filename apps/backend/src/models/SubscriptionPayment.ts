import { Model } from "./Model";
import { paymentMethodEnum, paymentStatusEnum } from "../database/schema";
import { subscriptionPaymentSchema, SubscriptionPaymentType } from "../schemas/subscriptionPaymentSchema";

export type paymentStatus = (typeof paymentStatusEnum.enumValues)[number];
export type paymentMethod = (typeof paymentMethodEnum.enumValues)[number];

export class SubscriptionPayment extends Model {
  private subscriptionId!: string;
  private amountInCents!: number;
  private dueDate!: Date;
  private status!: paymentStatus;
  private paymentMethod!: paymentMethod;

  constructor({ id, subscriptionId, amountInCents, dueDate, status, paymentMethod }: SubscriptionPaymentType) {
    super(id);

    subscriptionPaymentSchema.parse({ subscriptionId, amountInCents, dueDate, status, paymentMethod });
    this.subscriptionId = subscriptionId;
    this.amountInCents = amountInCents;
    this.dueDate = dueDate;
    this.status = status;
    this.paymentMethod = paymentMethod;
  }

  getSubscriptionId() {
    return this.subscriptionId;
  }

  setSubscriptionId(subscriptionId: string) {
    this.subscriptionId = subscriptionId;
  }

  getAmountInCents() {
    return this.amountInCents;
  }

  setAmountInCents(amountInCents: number) {
    this.amountInCents = amountInCents;
  }

  getDueDate() {
    return this.dueDate;
  }

  setDueDate(dueDate: Date) {
    this.dueDate = dueDate;
  }

  getStatus() {
    return this.status;
  }

  setStatus(status: paymentStatus) {
    this.status = status;
  }

  getPaymentMethod() {
    return this.paymentMethod;
  }

  setPaymentMethod(paymentMethod: paymentMethod) {
    this.paymentMethod = paymentMethod;
  }
}
