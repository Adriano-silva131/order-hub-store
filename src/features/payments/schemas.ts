import { z } from "zod";

export const PAYMENT_METHODS = {
  cartao: "STRIPE",
  pix: "MERCADOPAGO",
  boleto: "MERCADOPAGO",
} as const;

export type PaymentOption = keyof typeof PAYMENT_METHODS;

export const startCheckoutSchema = z.object({
  orderId: z.string(),
  paymentMethod: z.enum(["STRIPE", "MERCADOPAGO"]),
});

export const checkoutResponseSchema = z.object({
  checkoutUrl: z.url({ protocol: /^https$/ }),
});
