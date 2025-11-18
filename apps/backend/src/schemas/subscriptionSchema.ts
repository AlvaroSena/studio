import { z } from "zod";

export const subscriptionSchema = z.object({
  id: z.uuid({ message: "Invalid ID" }).optional(),
  planId: z.uuid({ message: "Invalid ID" }),
  studentId: z.uuid({ message: "Invalid ID" }),
  status: z.enum(["PENDING", "ACTIVE", "SUSPENDED", "CANCELED"], {
    message: "Invalid status",
  }),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  updatedAt: z.date({ message: "Invalid date" }).optional(),
});

export type SubscriptionType = z.infer<typeof subscriptionSchema>;
