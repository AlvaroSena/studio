import { userSchema, UserType } from "@shared/schemas/user"
import { Exclude, instanceToPlain, plainToInstance } from 'class-transformer';
import { db } from "../database";
import { userRoleEnum, users } from "../database/schema";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { ConflictException } from "../exceptions/ConflictException";
import { NotFoundException } from "../exceptions/NotFoundException";

export type UserRole = (typeof userRoleEnum.enumValues)[number];

export class User {
  private id?: string;
  private avatarUrl!: string | null;
  private name!: string;
  private email!: string;
  private role!: UserRole;
  private createdAt?: Date;
  private updatedAt?: Date;

  @Exclude()
  private password!: string;

  constructor({ id, name, email, password, role, createdAt, updatedAt }: Partial<UserType> = {}) {
    if (name && email && password && role) {
      userSchema.parse({ id, name, email, password, role });
      this.name = name
      this.email = email
      this.password = password
      this.role = role;
    }

    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId() {
    return this.id;
  }

  setId(id: string) {
    this.id = id;
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

  getCreatedAt() {
    return this.createdAt;
  }

  setCreatedAt(createdAt: Date) {
    this.createdAt = createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }

  setUpdatedAt(updatedAt: Date) {
    this.updatedAt = updatedAt;
  }


  async save(): Promise<Partial<User>> {
    const [emailAlreadyTaken] = await db.select().from(users).where(eq(users.email, this.getEmail()));

    if (emailAlreadyTaken) {
      throw new ConflictException("E-mail already taken.");
    }

    const passwordHash = await hash(this.getPassword(), 6);

    this.setPassword(passwordHash)

    const [createdUser] = await db.insert(users).values({ name: this.getName(), email: this.getEmail(), password: this.getPassword(), role: "admin" }).returning();

    const createdUserInstance = plainToInstance(User, createdUser);

    return instanceToPlain(createdUserInstance);
  }

  static async findAll(): Promise<Partial<User>[]>  {
    const result = await db
      .select({
        id: users.id,
        name: users.name,
        avatarUrl: users.avatarUrl,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt
      })
      .from(users);


    return plainToInstance(User, result);
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
      password: user.password,
      role: user.role,
      createdAt: user.createdAt!,
      updatedAt: user.updatedAt!
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
      password: user.password,
      role: user.role,
      createdAt: user.createdAt!,
      updatedAt: user.updatedAt!
    });
  }

  static async delete(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }

}
