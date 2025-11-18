import { z } from "zod";

export const subscriptionPaymentSchema = z.object({
  id: z.uuid({ message: "Invalid ID" }).optional(),
  subscriptionId: z.uuid({ message: "Invalid ID" }),
  amountInCents: z.number(),
  dueDate: z.coerce.date(),
  status: z.enum(["PENDING", "PAID", "OVERDUE", "CANCELED"], {
    message: "Invalid status",
  }),
  paymentMethod: z.enum(["PIX", "CASH", "CREDIT_CARD", "DEBIT_CARD"], {
    message: "Invalid payment method",
  }),
});

export type SubscriptionPaymentType = z.infer<typeof subscriptionPaymentSchema>;
