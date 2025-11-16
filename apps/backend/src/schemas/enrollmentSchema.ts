import { z } from "zod";

export const enrollmentSchema = z.object({
  id: z.uuid({ message: "Invalid ID" }).optional(),
  classId: z.uuid({ message: "Invalid ID" }),
  studentId: z.uuid({ message: "Invalid ID" }),
  createdAt: z.date({ message: "Invalid date" }).optional(),
  updatedAt: z.date({ message: "Invalid date" }).optional(),
});

export type EnrollmentType = z.infer<typeof enrollmentSchema>;
