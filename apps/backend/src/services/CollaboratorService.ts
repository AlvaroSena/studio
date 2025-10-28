import { hash } from "bcryptjs";
import { Collaborator } from "../models/Collaborator";
import { CollaboratorType } from "../schemas/collaboratorSchema";
import { GetCollaboratorResponseDTO } from "../dtos/CollaboratorDTO";
import { ConflictException } from "../exceptions/ConflictException";
import { NotFoundException } from "../exceptions/NotFoundException";
import { ICollaboratorRepository } from "../repositories/ICollaboratorRepository";
import { s3 } from "../utils/s3";

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

  async upload(id: string, file: Express.Multer.File): Promise<string> {
    const bucketName = process.env.AWS_BUCKET!;
    const collaborator = await this.repository.findById(id);

    if (!collaborator) {
      throw new NotFoundException("Collaborator not found.");
    }

    const collaboratorExistingPhoto = collaborator.getPhotoUrl();

    if (collaboratorExistingPhoto) {
      const splitedUrl = collaboratorExistingPhoto.split("/");
      
      const key = `avatars/${splitedUrl[splitedUrl.length - 1]}`;

      await s3.deleteObject({
        Bucket: bucketName,
        Key: key,
      }).promise();
    }

    const key = `avatars/${collaborator.getId()}-${file.originalname}`;

    await s3.upload({
      Bucket: bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }).promise();

    const url = `https://${bucketName}.s3.${process.env.AWS_REGION!}.amazonaws.com/${key}`;

    return url;
  }
}
