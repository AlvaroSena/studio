import { userSchema, UserType } from "@shared/schemas/user"
import { db } from "../database";
import { users } from "../database/schema";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { ConflictException } from "../exceptions/ConflictException";

export class User {
  private id?: string;
  private name!: string;
  private email!: string;
  private password!: string;

  constructor({ id, name, email, password }: UserType) {
    userSchema.parse({ id, name, email, password });
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
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

  async save(): Promise<User> {
    const [emailAlreadyTaken] = await db.select().from(users).where(eq(users.email, this.getEmail()));

    if (emailAlreadyTaken) {
      throw new ConflictException("E-mail already taken.");
    }

    const passwordHash = await hash(this.getPassword(), 6);

    this.setPassword(passwordHash)

    const [createdUser] = await db.insert(users).values({ name: this.getName(), email: this.getEmail(), password: this.getPassword(), role: "admin" }).returning();

    Object.assign(this, createdUser);
    return this;
  }
}
