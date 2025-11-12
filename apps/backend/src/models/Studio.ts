import { Model } from "./Model";
import { studioSchema, StudioType } from "../schemas/studioSchema";

export class Studio extends Model {
  private name!: string;
  private address!: string;

  constructor({ id, name, address, createdAt, updatedAt }: StudioType) {
    super(id, createdAt, updatedAt);

    studioSchema.parse({ name, address });
    ((this.name = name), (this.address = address));
  }

  getName() {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getAddress() {
    return this.address;
  }

  setAddress(address: string) {
    this.address = address;
  }
}
