import { NotFoundException } from "../exceptions/NotFoundException";
import { Studio } from "../models/Studio";
import { IStudioRepository } from "../repositories/IStudioRepository";
import { StudioType } from "../schemas/studioSchema";

export class StudioService {
  constructor(private repository: IStudioRepository) {}

  async listAll() {
    const studios = await this.repository.findAll();

    return studios;
  }

  async create(dto: StudioType): Promise<Studio> {
    const studio = new Studio({
      name: dto.name,
      address: dto.address,
    });

    const createdStudio = await this.repository.save(studio);

    return createdStudio;
  }

  async getById(id: string): Promise<Studio> {
    const studio = await this.repository.findById(id);

    if (!studio) {
      throw new NotFoundException("Studio not found.");
    }

    return studio;
  }
}
