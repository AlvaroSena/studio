import { z } from "zod";

export const classSchema = z.object({
  id: z.uuid({ message: "Invalid ID" }).optional(),
  studioId: z.uuid({ message: "Invalid ID" }),
  instructorId: z.uuid({ message: "Invalid ID" }),
  studentId: z.uuid({ message: "Invalid ID" }),
  date: z.date(),
  status: z.enum(["SCHEDULED", "DONE", "CANCELED"], {
    message: "Invalid status",
  }),
  type: z.enum(["NORMAL", "REPLACEMENT", "EXPERIMENTAL"], {
    message: "Invalid role",
  }),
  createdAt: z.date({ message: "Invalid date" }).optional(),
  updatedAt: z.date({ message: "Invalid date" }).optional(),
});

export type ClassType = z.infer<typeof classSchema>;
