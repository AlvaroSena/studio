import { z } from "zod";
import { enrollmentSchema } from "./enrollmentSchema";

export const classSchema = z.object({
  id: z.uuid({ message: "Invalid ID" }).optional(),
  title: z.string(),
  studioId: z.uuid({ message: "Invalid ID" }),
  instructorId: z.uuid({ message: "Invalid ID" }),
  date: z.coerce.date(),
  status: z.enum(["SCHEDULED", "DONE", "CANCELED"], {
    message: "Invalid status",
  }),
  type: z.enum(["NORMAL", "REPLACEMENT", "EXPERIMENTAL"], {
    message: "Invalid role",
  }),
  color: z.enum(["sky", "amber", "violet", "rose", "emerald", "orange"], {
    message: "Invalid color",
  }),
  enrollments: z.array(enrollmentSchema).optional(),
  createdAt: z.date({ message: "Invalid date" }).optional(),
  updatedAt: z.date({ message: "Invalid date" }).optional(),
});

export type ClassType = z.infer<typeof classSchema>;
