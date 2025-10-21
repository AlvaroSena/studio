import { z } from "zod";

export const collaboratorSchema = z.object({
  id: z.uuid({ message: "Invalid ID" }).optional(),
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  photoUrl: z.url().optional(),
  regionalCouncil: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  birthDate: z.date({ message: "Invalid date" }),
  email: z.email({ message: "Invalid e-mail" }),
  phoneNumber: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  hiringDate: z.date({ message: "Invalid date" }).optional(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  role: z.enum(["admin", "recepcionist", "instructor"], {
    message: "Invalid role",
  }),
  createdAt: z.date({ message: "Invalid date" }).optional(),
  updatedAt: z.date({ message: "Invalid date" }).optional(),
});

export type CollaboratorType = z.infer<typeof collaboratorSchema>;
