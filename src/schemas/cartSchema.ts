import { z } from "zod";

export const cartItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  brand: z.string(),
  imageUrl: z.string(),
  storage: z.string(),
  color: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export type CartItem = z.infer<typeof cartItemSchema>;
