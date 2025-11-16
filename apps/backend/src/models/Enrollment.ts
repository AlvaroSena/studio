import { Model } from "./Model";
import { enrollmentSchema, EnrollmentType } from "../schemas/enrollmentSchema";

export class Enrollment extends Model {
  private classId!: string;
  private studentId!: string;

  constructor({ id, classId, studentId, createdAt, updatedAt }: EnrollmentType) {
    super(id, createdAt, updatedAt);

    enrollmentSchema.parse({ classId, studentId });
    this.classId = classId;
    this.studentId = studentId;
  }

  getClassId() {
    return this.classId;
  }

  setClassId(classId: string) {
    this.classId = classId;
  }

  getStudentId() {
    return this.studentId;
  }

  setStudentId(studentId: string) {
    this.studentId = studentId;
  }
}
