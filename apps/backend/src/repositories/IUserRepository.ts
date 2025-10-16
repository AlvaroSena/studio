import { User } from "../models/UserModel";

export interface IUserRepository {
  save(user: User): Promise<User>;
  findAll(): Promise<Omit<User, "password">[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}
