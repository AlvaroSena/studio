import { classColorEnum, classStatusEnum, classTypeEnum } from "../database/schema";
import { Model } from "./Model";
import { ClassType as ClassSchemaType, classSchema } from "../schemas/classSchema";
import { EnrollmentType } from "../schemas/enrollmentSchema";

export type ClassStatus = (typeof classStatusEnum.enumValues)[number];
export type ClassType = (typeof classTypeEnum.enumValues)[number];
export type ClassColor = (typeof classColorEnum.enumValues)[number];

export class Class extends Model {
  private title!: string;
  private studioId!: string;
  private instructorId!: string;
  private date!: Date;
  private status!: ClassStatus;
  private type!: ClassType;
  private color!: ClassColor;
  private enrollments?: EnrollmentType[];

  constructor({
    id,
    title,
    studioId,
    instructorId,
    date,
    status,
    type,
    color,
    createdAt,
    updatedAt,
    enrollments,
  }: ClassSchemaType) {
    super(id, createdAt, updatedAt);

    classSchema.parse({ title, studioId, instructorId, date, status, type, color });
    this.title = title;
    this.studioId = studioId;
    this.instructorId = instructorId;
    this.date = date;
    this.status = status;
    this.type = type;
    this.color = color;

    if (enrollments) {
      this.enrollments = enrollments;
    }
  }

  getTitle() {
    return this.title;
  }

  setTitle(title: string) {
    this.title = title;
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

  getColor() {
    return this.color;
  }

  setColor(color: ClassColor) {
    this.color = color;
  }

  getEnrollments() {
    return this.enrollments;
  }

  setEnrollments(enrollments: EnrollmentType[]) {
    this.enrollments = enrollments;
  }
}
