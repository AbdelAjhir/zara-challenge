import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),
  brand: z.string(),
  name: z.string(),
  basePrice: z.number(),
  imageUrl: z.string().url(),
});

export const productsSchema = z.array(productSchema);

export type Product = z.infer<typeof productSchema>;
export type Products = z.infer<typeof productsSchema>;
