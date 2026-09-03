import { z } from "zod";

const productResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  attributes: z.record(z.string(), z.unknown()).default({}),
  active: z.boolean(),
  sellerId: z.string(),
  stockQuantity: z.number(),
});

export const productSchema = productResponseSchema.transform((product) => ({
  id: product.id,
  name: product.name,
  description: product.description,
  priceCents: Math.round(product.price * 100),
  attributes: product.attributes,
  active: product.active,
  sellerId: product.sellerId,
  stockQuantity: product.stockQuantity,
}));

export const productListSchema = z.array(productSchema);

export type Product = z.infer<typeof productSchema>;
