import { http } from "@/shared/lib/http";
import { productListSchema } from "../schemas";

export async function getProductsClient() {
  const data = await http<unknown>("/api/gateway/api/v1/products");
  return productListSchema.parse(data);
}
