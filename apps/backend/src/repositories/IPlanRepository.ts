import { Plan } from "../models/Plan";

export interface IPlanRepository {
  save(plan: Plan): Promise<Plan>;
  findAll(): Promise<Plan[]>;
  findById(id: string): Promise<Plan | null>;
  update(plan: Plan, id: string): Promise<Plan>;
  delete(id: string): Promise<void>;
}
