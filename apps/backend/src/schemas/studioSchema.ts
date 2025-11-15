import { z } from "zod";

export const studioSchema = z.object({
  id: z.uuid({ message: "Invalid ID" }).optional(),
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  address: z.string().min(3, { message: "Address is too short" }),
  createdAt: z.date({ message: "Invalid date" }).optional(),
  updatedAt: z.date({ message: "Invalid date" }).optional(),
});

export type StudioType = z.infer<typeof studioSchema>;
