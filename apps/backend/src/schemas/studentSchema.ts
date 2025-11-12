import { z } from "zod";

export const studentSchema = z.object({
  id: z.uuid({ message: "Invalid ID" }).optional(),
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  avatarUrl: z.url().optional(),
  birthDate: z.coerce.date(),
  cpf: z.string().min(11, { message: "CPF is required" }),
  email: z.email({ message: "Invalid e-mail" }),
  phone: z.string().min(3, { message: "Phone number is required" }),
  profession: z.string().min(3, { message: "Profession is required" }),
  registeredBy: z.uuid({ message: "Invalid ID" }),
  createdAt: z.date({ message: "Invalid date" }).optional(),
  updatedAt: z.date({ message: "Invalid date" }).optional(),
});

export type StudentType = z.infer<typeof studentSchema>;
