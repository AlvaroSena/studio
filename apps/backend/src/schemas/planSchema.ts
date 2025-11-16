import { z } from "zod";

export const planSchema = z.object({
  id: z.uuid({ message: "Invalid ID" }).optional(),
  period: z.enum(["MONTHLY", "QUARTERLY", "SEMIANNUAL", "ANNUAL"], {
    message: "Invalid period type",
  }),
  frequency: z.string(),
  monthlyPriceInCents: z.number(),
  totalPriceInCents: z.number(),
  createdAt: z.date({ message: "Invalid date" }).optional(),
  updatedAt: z.date({ message: "Invalid date" }).optional(),
});

export type PlanType = z.infer<typeof planSchema>;
