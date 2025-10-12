import crypto from "crypto";

export abstract class Model {
  protected id: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(id?: string, createdAt?: Date, updatedAt?: Date) {
    this.id = id || crypto.randomUUID();
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  getId(): string {
    return this.id;
  }

  setId(id: string) {
    this.id = id;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  setCreatedAt(createdAt: Date) {
    this.createdAt = createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  setUpdatedAt(updatedAt: Date) {
    this.updatedAt = updatedAt;
  }
}
