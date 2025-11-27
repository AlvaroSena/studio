import { BadRequestException } from "../exceptions/BadRequestException";
import { ConflictException } from "../exceptions/ConflictException";
import { NotFoundException } from "../exceptions/NotFoundException";
import { Subscription } from "../models/Subscription";
import { IPlanRepository } from "../repositories/IPlanRepository";
import { IStudentRepository } from "../repositories/IStudentRepository";
import { ISubscriptionRepository } from "../repositories/ISubscriptionRepository";

export class SubscriptionService {
  constructor(
    private repository: ISubscriptionRepository,
    private planRepository: IPlanRepository,
    private studentRepository: IStudentRepository,
  ) {}

  async listAll() {
    const subscriptions = await this.repository.findAll();

    return subscriptions;
  }

  async create({ planId, studentId }: { planId: string; studentId: string }): Promise<Subscription> {
    const planExists = await this.planRepository.findById(planId);

    if (!planExists) {
      throw new NotFoundException("Plan not found");
    }

    const isStudentAlreadySubscribed = await this.repository.findByStudentId(studentId);

    if (isStudentAlreadySubscribed) {
      throw new ConflictException("Student already has a subscription");
    }

    const todayDate = new Date();
    const endDate = new Date(todayDate);

    if (planExists.getPeriod() === "MONTHLY") {
      endDate.setMonth(endDate.getMonth() + 1); // 30 days
    }

    if (planExists.getPeriod() === "ANNUAL") {
      endDate.setMonth(endDate.getMonth() + 12); // a years
    }

    const studentExists = await this.studentRepository.findById(studentId);

    if (!studentExists) {
      throw new NotFoundException("Student not found");
    }

    const subscription = await this.repository.save(
      new Subscription({
        planId,
        studentId,
        status: "PENDING",
        startDate: new Date(),
        endDate,
      }),
    );

    return subscription;
  }

  async update({ id, planId, studentId }: { id: string; planId: string; studentId: string }) {
    const planExists = await this.planRepository.findById(planId);

    if (!planExists) {
      throw new NotFoundException("Plan not found");
    }

    const todayDate = new Date();
    const endDate = new Date(todayDate);

    if (planExists.getPeriod() === "MONTHLY") {
      endDate.setMonth(endDate.getMonth() + 1); // 30 days
    }

    if (planExists.getPeriod() === "ANNUAL") {
      endDate.setMonth(endDate.getMonth() + 12); // a years
    }

    const studentExists = await this.studentRepository.findById(studentId);

    if (!studentExists) {
      throw new NotFoundException("Student not found");
    }

    const updatedSubscription = await this.repository.update(
      new Subscription({
        planId,
        studentId,
        status: "PENDING",
        startDate: new Date(),
        endDate,
      }),
      id,
    );

    return updatedSubscription;
  }

  async removeMany(subscriptionIds: string[]) {
    if (!subscriptionIds) {
      throw new BadRequestException("IDs weren't provided");
    }

    await this.repository.deleteMany(subscriptionIds);
  }
}
