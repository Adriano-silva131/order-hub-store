import { z } from "zod";

const orderResponseSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  status: z.string(),
  totalAmount: z.number(),
  createdAt: z.string(),
});

export const orderSchema = orderResponseSchema.transform((order) => ({
  id: order.id,
  status: order.status,
  totalCents: Math.round(order.totalAmount * 100),
}));

export type Order = z.infer<typeof orderSchema>;

export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1, { error: "Seu carrinho está vazio." }),
});
