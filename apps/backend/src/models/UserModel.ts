import { userSchema, UserType } from "@shared/schemas/user";
import { Model } from "./Model";
import { userRoleEnum, users } from "../database/schema";

export type UserRole = (typeof userRoleEnum.enumValues)[number];

export class User extends Model {
  private name!: string;
  private avatarUrl!: string | null;
  private email!: string;
  private password!: string;
  private role!: UserRole;

  constructor({ id, name, avatarUrl, email, password, role, createdAt, updatedAt }: UserType) {
    super(id, createdAt, updatedAt);

    userSchema.parse({ name, email, password, role });
    this.name = name;
    this.avatarUrl = avatarUrl ?? null;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  getName() {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getAvatarUrl() {
    return this.avatarUrl;
  }

  setAvatarUrl(avatarUrl: string) {
    this.avatarUrl = avatarUrl;
  }

  getEmail() {
    return this.email;
  }

  setEmail(email: string) {
    this.email = email;
  }

  getPassword() {
    return this.password;
  }

  setPassword(password: string) {
    this.password = password;
  }

  getRole() {
    return this.role;
  }

  setRole(role: UserRole) {
    this.role = role;
  }
}
