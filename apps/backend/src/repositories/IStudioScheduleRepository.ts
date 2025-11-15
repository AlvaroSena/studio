import { StudioSchedule } from "../models/StudioSchedule";

export interface IStudioScheduleRepository {
  save(studioSchedule: StudioSchedule): Promise<StudioSchedule>;
  findAll(): Promise<StudioSchedule[]>;
  findAllByStudioId(studioId: string): Promise<StudioSchedule[]>;
  findById(id: string): Promise<StudioSchedule | null>;
  update(studioSchedule: StudioSchedule, id: string): Promise<StudioSchedule>;
  delete(id: string): Promise<void>;
}
