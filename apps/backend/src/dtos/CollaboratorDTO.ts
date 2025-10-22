import { CollaboratorRole } from "../models/Collaborator";

export interface GetCollaboratorResponseDTO {
  collaborator: {
    id: string;
    name: string;
    photoUrl: string | null;
    role: CollaboratorRole;
  };
}
