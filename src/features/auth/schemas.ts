import { z } from "zod";

export const requestCodeSchema = z.object({
  email: z.email({ error: "Informe um e-mail válido." }),
});

export const verifyCodeSchema = z.object({
  email: z.email(),
  code: z
    .string()
    .length(6, { error: "O código tem 6 dígitos." })
    .regex(/^\d+$/, { error: "O código deve conter só números." }),
});

export type RequestCodeInput = z.infer<typeof requestCodeSchema>;
export type VerifyCodeInput = z.infer<typeof verifyCodeSchema>;
