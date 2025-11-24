import { Request, Response } from "express";
import { CollaboratorService } from "../services/CollaboratorService";
import { CollaboratorRole } from "../models/Collaborator";

export class CollaboratorController {
  constructor(private collaboratorService: CollaboratorService) {}

  async listAll(request: Request, response: Response) {
    const collaborators = await this.collaboratorService.listAll();
    return response.json(collaborators);
  }

  async listAllByRole(request: Request, response: Response) {
    const role = request.params.role as CollaboratorRole;

    const collaborators = await this.collaboratorService.listAllByRole(role);
    return response.json(collaborators);
  }

  async create(request: Request, response: Response) {
    const data = request.body;

    const user = await this.collaboratorService.create(data);

    return response.status(201).json({
      userId: user.getId(),
    });
  }

  async getById(request: Request, response: Response) {
    const id = request.params.id;

    const collaborator = await this.collaboratorService.getById(id);

    return response.json(collaborator);
  }

  async getProfile(request: Request, response: Response) {
    const { sub } = request.user as { sub: string };

    const collaborator = await this.collaboratorService.getById(sub);

    return response.json(collaborator);
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id;

    await this.collaboratorService.remove(id);

    return response.status(204).send();
  }

  async upload(request: Request, response: Response) {
    const { sub } = request.user as { sub: string };
    const file = request.file as Express.Multer.File;

    await this.collaboratorService.upload(sub, file);
    return response.status(204).send();
  }
}
