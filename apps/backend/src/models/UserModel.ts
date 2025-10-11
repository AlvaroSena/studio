import { userSchema, UserType } from "@shared/schemas/user"
import { Exclude, instanceToPlain, plainToInstance } from 'class-transformer';
import { db } from "../database";
import { users } from "../database/schema";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { ConflictException } from "../exceptions/ConflictException";

export class User {
  private id?: string;
  private avatarUrl!: string;
  private name!: string;
  private email!: string;

  @Exclude()
  private password!: string;

  constructor({ id, name, email, password }: Partial<UserType> = {}) {
    if (name && email && password) {
      userSchema.parse({ id, name, email, password });
      this.name = name
      this.email = email
      this.password = password
    }

    this.id = id;
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
}
