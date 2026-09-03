"use server";

import { authorizedApiGatewayFetch } from "@/shared/lib/backend-client";
import { actionClient } from "@/shared/lib/safe-action";
import { checkoutResponseSchema, startCheckoutSchema } from "./schemas";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const CHECKOUT_STATUS_MESSAGES: Record<number, string> = {
  404: "Ainda estamos preparando seu pagamento — tente novamente em alguns segundos.",
  403: "Este pedido não pertence à sua conta.",
  409: "Esse pedido já foi pago ou está em outro pagamento em andamento.",
};

export const startPaymentCheckoutAction = actionClient
  .inputSchema(startCheckoutSchema)
  .action(async ({ parsedInput }) => {
    const delaysMs = [0, 600, 1200, 2000];
    let lastStatus = 0;

    for (const delay of delaysMs) {
      if (delay > 0) await sleep(delay);

      const res = await authorizedApiGatewayFetch("/api/v1/payments/checkout", {
        method: "POST",
        body: JSON.stringify(parsedInput),
      });

      if (res.ok) {
        const parsed = checkoutResponseSchema.safeParse(await res.json());
        if (!parsed.success) {
          throw new Error("Não foi possível iniciar o pagamento. Tente novamente.");
        }
        return parsed.data;
      }

      lastStatus = res.status;
      if (res.status !== 404) break;
    }

    throw new Error(
      CHECKOUT_STATUS_MESSAGES[lastStatus] ?? "Não foi possível iniciar o pagamento. Tente novamente.",
    );
  });
