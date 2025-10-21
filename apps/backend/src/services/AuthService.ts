import { compare } from "bcryptjs";
import { generateTokens } from "../utils/generateTokens";
import { verify } from "jsonwebtoken";
import { InvalidCredentialsException } from "../exceptions/InvalidCredentialsException";
import { ICollaboratorRepository } from "../repositories/ICollaboratorRepository";
import { CollaboratorRole } from "../models/Collaborator";

export interface CollaboratorPayloadDTO {
  sub: string;
  role: CollaboratorRole;
}

export class AuthService {
  constructor(private collaboratorRepository: ICollaboratorRepository) {}

  async login(email: string, password: string) {
    const user = await this.collaboratorRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsException("E-mail or password is incorrect.");
    }

    const passwordMatch = await compare(password, user.getPassword());

    if (!passwordMatch) {
      throw new InvalidCredentialsException("E-mail or password is incorrect.");
    }

    const { accessToken, refreshToken } = generateTokens({ sub: user.getId(), role: user.getRole() });

    return {
      accessToken,
      refreshToken,
    };
  }

  refresh(token: string) {
    const payload = verify(token, process.env.AUTH_SECRET!) as CollaboratorPayloadDTO;
    const { accessToken, refreshToken } = generateTokens({
      sub: payload.sub,
      role: payload.role,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
