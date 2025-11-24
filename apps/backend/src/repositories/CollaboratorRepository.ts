import { db } from "../database";
import { collaborators } from "../database/schema";
import { eq } from "drizzle-orm";
import { Collaborator, CollaboratorRole } from "../models/Collaborator";
import { ICollaboratorRepository } from "./ICollaboratorRepository";

export class CollaboratorRepository implements ICollaboratorRepository {
  async save(collaborator: Collaborator): Promise<Collaborator> {
    const [createdCollaborator] = await db
      .insert(collaborators)
      .values({
        id: collaborator.getId(),
        name: collaborator.getName(),
        regionalCouncil: collaborator.getRegionalCouncil(),
        birthDate: collaborator.getBirthDate().toString(),
        email: collaborator.getEmail(),
        phoneNumber: collaborator.getPhoneNumber(),
        password: collaborator.getPassword(),
        role: collaborator.getRole(),
      })
      .returning();

    return new Collaborator({
      id: createdCollaborator.id,
      name: createdCollaborator.name,
      photoUrl: createdCollaborator.photoUrl!,
      regionalCouncil: createdCollaborator.regionalCouncil,
      birthDate: new Date(createdCollaborator.birthDate),
      email: createdCollaborator.email,
      phoneNumber: createdCollaborator.phoneNumber,
      password: createdCollaborator.password!,
      role: createdCollaborator.role,
      createdAt: createdCollaborator.createdAt!,
      updatedAt: createdCollaborator.updatedAt!,
    });
  }

  async findAll(): Promise<Omit<Collaborator, "password">[]> {
    const result = await db
      .select({
        id: collaborators.id,
        name: collaborators.name,
        photoUrl: collaborators.photoUrl,
        email: collaborators.email,
        role: collaborators.role,
        createdAt: collaborators.createdAt,
        updatedAt: collaborators.updatedAt,
      })
      .from(collaborators);

    return result.map((user) => {
      const { password, ...rest } = user as any;
      return rest;
    });
  }

  async findAllByRole(role: CollaboratorRole): Promise<Omit<Collaborator, "password">[]> {
    const result = await db
      .select({
        id: collaborators.id,
        name: collaborators.name,
        photoUrl: collaborators.photoUrl,
        email: collaborators.email,
        role: collaborators.role,
        createdAt: collaborators.createdAt,
        updatedAt: collaborators.updatedAt,
      })
      .from(collaborators)
      .where(eq(collaborators.role, role));

    return result.map((user) => {
      const { password, ...rest } = user as any;
      return rest;
    });
  }

  async findById(id: string): Promise<Collaborator | null> {
    const [collaborator] = await db.select().from(collaborators).where(eq(collaborators.id, id));

    if (!collaborator) {
      return null;
    }

    return new Collaborator({
      id: collaborator.id,
      name: collaborator.name,
      photoUrl: collaborator.photoUrl!,
      regionalCouncil: collaborator.regionalCouncil,
      birthDate: new Date(collaborator.birthDate),
      email: collaborator.email,
      phoneNumber: collaborator.phoneNumber,
      password: collaborator.password!,
      role: collaborator.role,
      createdAt: collaborator.createdAt!,
      updatedAt: collaborator.updatedAt!,
    });
  }

  async findByEmail(email: string): Promise<Collaborator | null> {
    const [collaborator] = await db.select().from(collaborators).where(eq(collaborators.email, email));

    if (!collaborator) {
      return null;
    }

    return new Collaborator({
      id: collaborator.id,
      name: collaborator.name,
      photoUrl: collaborator.photoUrl!,
      regionalCouncil: collaborator.regionalCouncil,
      birthDate: new Date(collaborator.birthDate),
      email: collaborator.email,
      phoneNumber: collaborator.phoneNumber,
      password: collaborator.password!,
      role: collaborator.role,
      createdAt: collaborator.createdAt!,
      updatedAt: collaborator.updatedAt!,
    });
  }

  update(collaborator: Collaborator): Promise<Collaborator> {
    throw new Error("Method not implemented.");
  }

  async updatePassword(id: string, password: string): Promise<void> {
    await db.update(collaborators).set({ password }).where(eq(collaborators.id, id));
  }

  async updatePhotoUrl(id: string, url: string): Promise<void> {
    await db.update(collaborators).set({ photoUrl: url }).where(eq(collaborators.id, id));
  }

  async delete(id: string): Promise<void> {
    await db.delete(collaborators).where(eq(collaborators.id, id));
  }
}
