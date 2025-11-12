import { Studio } from "../models/Studio";

export interface IStudioRepository {
  save(studio: Studio): Promise<Studio>;
  findAll(): Promise<Studio[]>;
  findById(id: string): Promise<Studio | null>;
  update(studio: Studio): Promise<Studio>;
  delete(id: string): Promise<void>;
}
