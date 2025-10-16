import { UserRole } from "../models/UserModel";

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UserPayloadDTO {
  sub: string;
  role: UserRole;
}
