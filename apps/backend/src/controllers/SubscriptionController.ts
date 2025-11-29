import { Request, Response } from "express";
import { SubscriptionService } from "../services/SubscriptionService";

export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  async listAll(request: Request, response: Response) {
    const subscriptions = await this.subscriptionService.listAll();

    return response.json(subscriptions);
  }

  async create(request: Request, response: Response) {
    const { planId, studentId } = request.body;

    const subscription = await this.subscriptionService.create({ planId, studentId });

    return response.status(201).json(subscription);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { planId, studentId } = request.body;

    const updatedSubscription = await this.subscriptionService.update({ id, planId, studentId });

    return response.json(updatedSubscription);
  }

  async updateStatus(request: Request, response: Response) {
    const { id } = request.params;
    const { status } = request.body;

    await this.subscriptionService.updateStatus(status, id);

    return response.status(204).send();
  }

  async deleteMany(request: Request, response: Response) {
    const { subscriptionIds } = request.body;

    await this.subscriptionService.removeMany(subscriptionIds);

    return response.status(204).send();
  }
}
