import { Request, Response } from "express";
import { CollaboratorService } from "../services/CollaboratorService";

export class CollaboratorController {
  constructor(private collaboratorService: CollaboratorService) {}

  async listAll(request: Request, response: Response) {
    const collaborators = await this.collaboratorService.listAll();
    return response.json(collaborators);
  }

  async create(request: Request, response: Response) {
    const data = request.body;

    const user = await this.collaboratorService.create(data);

    return response.status(201).json({
      userId: user.getId(),
    });
  }
}
