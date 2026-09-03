"use server";

import { authorizedApiGatewayFetch } from "@/shared/lib/backend-client";
import { actionClient } from "@/shared/lib/safe-action";
import { createOrderSchema, orderSchema } from "./schemas";

export const createOrderAction = actionClient
  .inputSchema(createOrderSchema)
  .action(async ({ parsedInput }) => {
    const res = await authorizedApiGatewayFetch("/api/v1/orders", {
      method: "POST",
      body: JSON.stringify(parsedInput),
    });

    if (!res.ok) {
      throw new Error("Não foi possível criar o pedido. Tente novamente.");
    }

    return orderSchema.parse(await res.json());
  });
