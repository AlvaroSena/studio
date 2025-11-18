import { NotFoundException } from "../exceptions/NotFoundException";
import { Plan } from "../models/Plan";
import { IPlanRepository } from "../repositories/IPlanRepository";
import { PlanType } from "../schemas/planSchema";

export class PlanService {
  constructor(private repository: IPlanRepository) {}

  async listAll() {
    const plans = await this.repository.findAll();

    return plans;
  }

  async create(dto: PlanType): Promise<Plan> {
    const plan = await this.repository.save(new Plan(dto));

    return plan;
  }

  async getById(id: string): Promise<Plan> {
    const plan = await this.repository.findById(id);

    if (!plan) {
      throw new NotFoundException("Plan not found");
    }

    return plan;
  }

  async update(dto: PlanType, id: string): Promise<Plan> {
    const plan = await this.repository.findById(id);

    if (!plan) {
      throw new NotFoundException("Plan not found");
    }

    const updatedPlan = await this.repository.update(new Plan(dto), id);

    return updatedPlan;
  }

  async remove(id: string): Promise<void> {
    const plan = await this.repository.findById(id);

    if (!plan) {
      throw new NotFoundException("Plan not found");
    }

    await this.repository.delete(id);
  }
}
