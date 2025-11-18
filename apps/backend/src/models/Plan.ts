import { planPeriodEnum } from "../database/schema";
import { planSchema, PlanType } from "../schemas/planSchema";
import { Model } from "./Model";

export type planPeriod = (typeof planPeriodEnum.enumValues)[number];

export class Plan extends Model {
  private period!: planPeriod;
  private frequency!: string;
  private monthlyPriceInCents!: number;
  private totalPriceInCents!: number;

  constructor({ id, period, frequency, monthlyPriceInCents, totalPriceInCents, createdAt, updatedAt }: PlanType) {
    super(id, createdAt, updatedAt);

    planSchema.parse({ period, frequency, monthlyPriceInCents, totalPriceInCents });
    this.period = period;
    this.frequency = frequency;
    this.monthlyPriceInCents = monthlyPriceInCents;
    this.totalPriceInCents = totalPriceInCents;
  }

  getPeriod() {
    return this.period;
  }

  setPeriod(period: planPeriod) {
    this.period = period;
  }

  getFrequency() {
    return this.frequency;
  }

  setFrequency(frequency: string) {
    this.frequency = frequency;
  }

  getMonthlyPriceInCents() {
    return this.monthlyPriceInCents;
  }

  setMonthlyPriceInCents(monthlyPriceInCents: number) {
    this.monthlyPriceInCents = monthlyPriceInCents;
  }

  getTotalPriceInCents() {
    return this.totalPriceInCents;
  }

  setTotalPriceInCents(totalPriceInCents: number) {
    this.totalPriceInCents = totalPriceInCents;
  }
}
