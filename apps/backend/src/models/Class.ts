import { classStatusEnum, classTypeEnum } from "../database/schema";
import { Model } from "./Model";
import { ClassType as ClassSchemaType, classSchema } from "../schemas/classSchema";
import { EnrollmentType } from "../schemas/enrollmentSchema";

export type ClassStatus = (typeof classStatusEnum.enumValues)[number];
export type ClassType = (typeof classTypeEnum.enumValues)[number];

export class Class extends Model {
  private studioId!: string;
  private instructorId!: string;
  private date!: Date;
  private status!: ClassStatus;
  private type!: ClassType;
  private enrollments?: EnrollmentType[];

  constructor({ id, studioId, instructorId, date, status, type, createdAt, updatedAt, enrollments }: ClassSchemaType) {
    super(id, createdAt, updatedAt);

    classSchema.parse({ studioId, instructorId, date, status, type });
    this.studioId = studioId;
    this.instructorId = instructorId;
    this.date = date;
    this.status = status;
    this.type = type;

    if (enrollments) {
      this.enrollments = enrollments;
    }
  }

  getStudioId() {
    return this.studioId;
  }

  setStudioId(studioId: string) {
    this.studioId = studioId;
  }

  getInstructorId() {
    return this.instructorId;
  }

  setInstructorId(instructorId: string) {
    this.instructorId = instructorId;
  }

  getDate() {
    return this.date;
  }

  setDate(date: Date) {
    this.date = date;
  }

  getStatus() {
    return this.status;
  }

  setStatus(status: ClassStatus) {
    this.status = status;
  }

  getType() {
    return this.type;
  }

  setType(type: ClassType) {
    this.type = type;
  }

  getEnrollments() {
    return this.enrollments;
  }

  setEnrollments(enrollments: EnrollmentType[]) {
    this.enrollments = enrollments;
  }
}
