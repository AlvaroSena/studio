import { z } from "zod";

export const userSchema = z.object({
  id: z.uuid({ message: "Invalid ID" }).optional(),
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  avatarUrl: z.url().optional(),
  email: z.email({ message: "Invalid e-mail" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  role: z.enum(["admin", "recepcionist", "instructor", "student"], {
    message: "Invalid role",
  }),
  createdAt: z.date({ message: "Invalid date" }).optional(),
  updatedAt: z.date({ message: "Invalid date" }).optional(),
});

export type UserType = z.infer<typeof userSchema>;
