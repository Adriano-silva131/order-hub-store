import { z } from "zod";

const envSchema = z.object({
  AUTH_SERVICE_URL: z.url().default("http://localhost:8090"),
  API_GATEWAY_URL: z.url().default("http://localhost:8000"),
});

export const env = envSchema.parse({
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL,
  API_GATEWAY_URL: process.env.API_GATEWAY_URL,
});
