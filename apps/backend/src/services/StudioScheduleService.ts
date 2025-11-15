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

  async create(dto: StudioScheduleType) {
    const studioExists = await this.studioRepository.findById(dto.studioId);

    if (!studioExists) {
      throw new NotFoundException("Studio not found");
    }

    const schedule = await this.repository.save(new StudioSchedule(dto));

    return schedule;
  }

  async update(dto: StudioScheduleType, id: string): Promise<StudioSchedule> {
    const scheduleExists = await this.repository.findById(id);

    if (!scheduleExists) {
      throw new NotFoundException("Schedule not found");
    }

    const updatedStudio = await this.repository.update(new StudioSchedule(dto), id);

    return updatedStudio;
  }

  async remove(id: string) {
    const scheduleExists = await this.repository.findById(id);

    if (!scheduleExists) {
      throw new NotFoundException("Schedule not found");
    }

    await this.repository.delete(id);
  }
}
