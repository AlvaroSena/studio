import { Class } from "../models/Class";

export interface IClassRepository {
  save(data: Class): Promise<Class>;
  findAll(): Promise<Class[]>;
  findById(id: string): Promise<Class | null>;
  update(data: Class, id: string): Promise<Class>;
  delete(id: string): Promise<void>;
}
