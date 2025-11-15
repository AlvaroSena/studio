import { Model } from "./Model";
import { studioScheduleSchema, StudioScheduleType } from "../schemas/studioScheduleSchema";

export class StudioSchedule extends Model {
  private studioId!: string;
  private dayOfWeek!: string;
  private openTime!: string;
  private closeTime!: string;

  constructor({ id, studioId, dayOfWeek, openTime, closeTime, createdAt, updatedAt }: StudioScheduleType) {
    super(id, createdAt, updatedAt);

    studioScheduleSchema.parse({ studioId, dayOfWeek, openTime, closeTime });
    this.studioId = studioId;
    this.dayOfWeek = dayOfWeek;
    this.openTime = openTime;
    this.closeTime = closeTime;
  }

  getStudioId() {
    return this.studioId;
  }

  setStudioId(studioId: string) {
    this.studioId = studioId;
  }

  getDayOfWeek() {
    return this.dayOfWeek;
  }

  setDayOfWeek(dayOfWeek: string) {
    this.dayOfWeek = dayOfWeek;
  }

  getOpenTime() {
    return this.openTime;
  }

  setOpenTime(openTime: string) {
    this.openTime = openTime;
  }

  getCloseTime() {
    return this.closeTime;
  }

  setCloseTime(closeTime: string) {
    this.closeTime = closeTime;
  }
}
