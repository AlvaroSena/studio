import { userSchema, UserType } from "@shared/schemas/user";
import { ConflictException } from "../exceptions/ConflictException";
import { NotFoundException } from "../exceptions/NotFoundException";
import { Model } from "./Model";
import { db } from "../database";
import { userRoleEnum, users } from "../database/schema";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";

export type UserRole = (typeof userRoleEnum.enumValues)[number];

export class User extends Model {
  private name!: string;
  private avatarUrl!: string | null;
  private email!: string;
  private password!: string;
  private role!: UserRole;

  constructor({
    id,
    name,
    avatarUrl,
    email,
    password,
    role,
    createdAt,
    updatedAt,
  }: UserType) {
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

  async save(): Promise<User> {
    const [emailAlreadyTaken] = await db
      .select()
      .from(users)
      .where(eq(users.email, this.getEmail()));

    if (emailAlreadyTaken) {
      throw new ConflictException("E-mail already taken.");
    }

    const passwordHash = await hash(this.getPassword(), 6);

    this.setPassword(passwordHash);

    const [createdUser] = await db
      .insert(users)
      .values({
        id: this.getId(),
        name: this.getName(),
        email: this.getEmail(),
        password: this.getPassword(),
        role: this.getRole(),
      })
      .returning();

    return new User({
      id: createdUser.id,
      name: createdUser.name,
      avatarUrl: createdUser.avatarUrl!,
      email: createdUser.email,
      password: createdUser.password!,
      role: createdUser.role,
      createdAt: createdUser.createdAt!,
      updatedAt: createdUser.updatedAt!,
    });
  }

  static async findAll(): Promise<Omit<User, "password">[]> {
    const result = await db
      .select({
        id: users.id,
        name: users.name,
        avatarUrl: users.avatarUrl,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users);

    return result.map((user) => {
      const { password, ...rest } = user as any;
      return rest;
    });
  }

  static async findById(id: string): Promise<User> {
    const [user] = await db.select().from(users).where(eq(users.id, id));

    if (!user) {
      throw new NotFoundException("User not found.");
    }

    return new User({
      id: user.id,
      name: user.name,
      avatarUrl: user.avatarUrl!,
      email: user.email,
      password: user.password!,
      role: user.role,
      createdAt: user.createdAt!,
      updatedAt: user.updatedAt!,
    });
  }

  static async findByEmail(email: string): Promise<User> {
    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      throw new NotFoundException("User not found.");
    }
    return new User({
      id: user.id,
      name: user.name,
      avatarUrl: user.avatarUrl!,
      email: user.email,
      password: user.password!,
      role: user.role,
      createdAt: user.createdAt!,
      updatedAt: user.updatedAt!,
    });
  }

  static async delete(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }
}
