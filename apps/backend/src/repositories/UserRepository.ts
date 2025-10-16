import { db } from "../database";
import { users } from "../database/schema";
import { eq } from "drizzle-orm";
import { User } from "../models/UserModel";
import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
  async save(user: User): Promise<User> {
    const [createdUser] = await db
      .insert(users)
      .values({
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword(),
        role: user.getRole(),
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

  async findAll(): Promise<Omit<User, "password">[]> {
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

  async findById(id: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.id, id));

    if (!user) {
      return null;
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

  async findByEmail(email: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      return null;
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

  update(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }
}
