import { NotFoundException } from "../exceptions/NotFoundException";
import { StudioSchedule } from "../models/StudioSchedule";
import { IStudioRepository } from "../repositories/IStudioRepository";
import { IStudioScheduleRepository } from "../repositories/IStudioScheduleRepository";
import { StudioScheduleType } from "../schemas/studioScheduleSchema";

export class StudioScheduleService {
  constructor(
    private repository: IStudioScheduleRepository,
    private studioRepository: IStudioRepository,
  ) {}

  async listAll(studioId: string) {
    const studioExists = await this.studioRepository.findById(studioId);

    if (!studioExists) {
      throw new NotFoundException("Studio not found");
    }

    const schedule = await this.repository.findAllByStudioId(studioExists.getId());

    return schedule;
  }

  async create(dto: StudioScheduleType[]) {
    const studioExists = await this.studioRepository.findById(dto[0].studioId);

    if (!studioExists) {
      throw new NotFoundException("Studio not found");
    }

    const schedules = dto.map((item) => new StudioSchedule(item));

    const schedule = await this.repository.save(schedules);

    return schedule;
  }

  async update(dto: StudioScheduleType[]): Promise<StudioSchedule[]> {
    const schedules = dto.map((item) => new StudioSchedule(item));

    const updatedSchedules = await this.repository.update(schedules);

    return updatedSchedules;
  }

  async remove(id: string) {
    const scheduleExists = await this.repository.findById(id);

    if (!scheduleExists) {
      throw new NotFoundException("Schedule not found");
    }

    await this.repository.delete(id);
  }
}
