import "server-only";
import { apiGatewayFetch } from "@/shared/lib/backend-client";
import { productListSchema, type Product } from "../schemas";

export async function getProducts(): Promise<Product[]> {
  const res = await apiGatewayFetch("/api/v1/products");

  if (!res.ok) {
    throw new Error(`Falha ao carregar produtos (${res.status})`);
  }

  return productListSchema.parse(await res.json());
}
