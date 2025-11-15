import { Request, Response } from "express";

import { StudioScheduleService } from "../services/StudioScheduleService";

export class StudioScheduleController {
  constructor(private studioScheduleService: StudioScheduleService) {}

  async listAll(request: Request, response: Response) {
    const studioId = request.params.studioId;

    const schedule = await this.studioScheduleService.listAll(studioId);

    return response.json(schedule);
  }

  async create(request: Request, response: Response) {
    const body = request.body;

    const schedule = await this.studioScheduleService.create(body);

    return response.status(201).json(schedule);
  }

  async update(request: Request, response: Response) {
    const id = request.params.id;
    const body = request.body;

    const updatedSchedule = await this.studioScheduleService.update(body, id);

    return response.json(updatedSchedule);
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id;

    await this.studioScheduleService.remove(id);

    return response.status(204).send();
  }
}
