"use server";

import { redirect } from "next/navigation";
import {
  authServiceFetch,
  setSessionCookies,
  clearSessionCookies,
  getRefreshToken,
} from "@/shared/lib/backend-client";
import { actionClient } from "@/shared/lib/safe-action";
import { requestCodeSchema, verifyCodeSchema } from "./schemas";

type TokenPair = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
};

export const requestCodeAction = actionClient
  .inputSchema(requestCodeSchema)
  .action(async ({ parsedInput }) => {
    const res = await authServiceFetch("/auth/request-code", {
      method: "POST",
      body: JSON.stringify(parsedInput),
    });

    if (!res.ok) {
      throw new Error("Não foi possível enviar o código. Tente novamente.");
    }
  });

export const verifyCodeAction = actionClient
  .inputSchema(verifyCodeSchema)
  .action(async ({ parsedInput }) => {
    const res = await authServiceFetch("/auth/verify-code", {
      method: "POST",
      body: JSON.stringify(parsedInput),
    });

    if (!res.ok) {
      throw new Error("Código inválido ou expirado. Peça um novo.");
    }

    const tokens: TokenPair = await res.json();
    await setSessionCookies(tokens);
  });

export const logoutAction = actionClient.action(async () => {
  const refreshToken = await getRefreshToken();
  if (refreshToken) {
    await authServiceFetch("/auth/logout", {
      method: "POST",
      body: JSON.stringify({ refresh_token: refreshToken }),
    }).catch(() => {});
  }
  await clearSessionCookies();
  redirect("/");
});
