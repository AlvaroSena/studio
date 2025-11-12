import { StudioSchedule } from "../models/StudioSchedule";

export interface IStudioScheduleRepository {
  save(studioSchedule: StudioSchedule): Promise<StudioSchedule>;
  findAll(): Promise<StudioSchedule[]>;
  findById(id: string): Promise<StudioSchedule | null>;
  update(studioSchedule: StudioSchedule): Promise<StudioSchedule>;
  delete(id: string): Promise<void>;
}
