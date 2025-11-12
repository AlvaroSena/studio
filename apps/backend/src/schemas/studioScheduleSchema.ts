import { z } from "zod";

export const studioScheduleSchema = z.object({
  id: z.uuid({ message: "Invalid ID" }).optional(),
  studioId: z.uuid({ message: "Invalid ID" }),
  dayOfWeek: z.string().min(3, { message: "Day is required" }),
  openTime: z.string().min(3, { message: "Open time is required" }),
  closeTime: z.string().min(3, { message: "Close time is required" }),
  createdAt: z.date({ message: "Invalid date" }).optional(),
  updatedAt: z.date({ message: "Invalid date" }).optional(),
});

export type StudioScheduleType = z.infer<typeof studioScheduleSchema>;
