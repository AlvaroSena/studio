import { Request, Response } from "express";
import { StudioService } from "../services/StudioService";

export class StudioController {
  constructor(private studioService: StudioService) {}

  async listAll(request: Request, response: Response) {
    const studios = await this.studioService.listAll();

    return response.json(studios);
  }

  async create(request: Request, response: Response) {
    const data = request.body;

    const studio = await this.studioService.create(data);

    return response.status(201).json({ studioId: studio.getId() });
  }

  async getById(request: Request, response: Response) {
    const id = request.params.id;

    const studio = await this.studioService.getById(id);

    return response.json({ studio });
  }

  async update(request: Request, response: Response) {
    const id = request.params.id;
    const data = request.body;

    const updatedStudio = await this.studioService.update(data, id);

    return response.json(updatedStudio);
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id;

    await this.studioService.remove(id);

    return response.status(204).send();
  }
}
