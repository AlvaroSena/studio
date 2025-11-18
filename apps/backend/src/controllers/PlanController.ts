import { Request, Response } from "express";
import { PlanService } from "../services/PlanService";

export class PlanController {
  constructor(private planService: PlanService) {}

  async listAll(request: Request, response: Response) {
    const plans = await this.planService.listAll();

    return response.json(plans);
  }

  async create(request: Request, response: Response) {
    const { period, frequency, monthlyPrice, totalPrice } = request.body;

    const plan = await this.planService.create({
      period,
      frequency,
      monthlyPriceInCents: monthlyPrice * 100,
      totalPriceInCents: totalPrice * 100,
    });

    return response.status(201).json(plan);
  }

  async getById(request: Request, response: Response) {
    const id = request.params.id;

    const plan = await this.planService.getById(id);

    return response.json(plan);
  }

  async update(request: Request, response: Response) {
    const id = request.params.id;
    const { period, frequency, monthlyPrice, totalPrice } = request.body;

    const updatedPlan = await this.planService.update(
      {
        period,
        frequency,
        monthlyPriceInCents: monthlyPrice * 100,
        totalPriceInCents: totalPrice * 100,
      },
      id,
    );

    return response.json(updatedPlan);
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id;

    await this.planService.remove(id);

    return response.status(204).send();
  }
}
