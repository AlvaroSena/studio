import { GetCollaboratorResponseDTO } from "../dtos/CollaboratorDTO";
import { ConflictException } from "../exceptions/ConflictException";
import { NotFoundException } from "../exceptions/NotFoundException";
import { Collaborator } from "../models/Collaborator";
import { ICollaboratorRepository } from "../repositories/ICollaboratorRepository";
import { CollaboratorType } from "../schemas/collaboratorSchema";
import { hash } from "bcryptjs";

export class CollaboratorService {
  constructor(private repository: ICollaboratorRepository) {}

  async listAll() {
    const collaborators = await this.repository.findAll();

    return collaborators;
  }

  async create(dto: CollaboratorType): Promise<Collaborator> {
    const collaboratorAlreadyExists = await this.repository.findByEmail(dto.email);

    if (collaboratorAlreadyExists) {
      throw new ConflictException("Email already in use.");
    }

    const collaborator = new Collaborator({
      name: dto.name,
      regionalCouncil: dto.regionalCouncil,
      birthDate: dto.birthDate,
      email: dto.email,
      phoneNumber: dto.phoneNumber,
      password: await hash(dto.password, 12),
      role: dto.role,
    });

    const createdCollaborator = await this.repository.save(collaborator);

    return createdCollaborator;
  }

  async getById(id: string): Promise<GetCollaboratorResponseDTO> {
    const collaborator = await this.repository.findById(id);

    if (!collaborator) {
      throw new NotFoundException("Collaborator not found.");
    }

    return {
      collaborator: {
        id: collaborator.getId(),
        name: collaborator.getName(),
        photoUrl: collaborator.getPhotoUrl(),
        role: collaborator.getRole(),
      },
    };
  }

  async remove(id: string): Promise<void> {
    const collaborator = await this.repository.findById(id);

    if (!collaborator) {
      throw new NotFoundException("Collaborator not found.");
    }

    await this.repository.delete(id);
  }
}
