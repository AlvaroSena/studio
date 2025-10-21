import { Collaborator } from "../models/Collaborator";

export interface ICollaboratorRepository {
  save(collaborator: Collaborator): Promise<Collaborator>;
  findAll(): Promise<Omit<Collaborator, "password">[]>;
  findById(id: string): Promise<Collaborator | null>;
  findByEmail(email: string): Promise<Collaborator | null>;
  update(collaborator: Collaborator): Promise<Collaborator>;
  delete(id: string): Promise<void>;
}
