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
}
