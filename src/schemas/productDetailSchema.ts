import { z } from "zod";

export const productDetailsSchema = z.object({
  id: z.string(),
  brand: z.string(),
  name: z.string(),
  description: z.string(),
  basePrice: z.number(),
  rating: z.number(),
  specs: z.object({
    screen: z.string(),
    resolution: z.string(),
    processor: z.string(),
    mainCamera: z.string(),
    selfieCamera: z.string(),
    battery: z.string(),
    os: z.string(),
    screenRefreshRate: z.string().optional(),
    storage: z.string().optional(),
  }),
  colorOptions: z.array(
    z.object({
      name: z.string(),
      hexCode: z.string(),
      imageUrl: z.string().url(),
    })
  ),
  storageOptions: z.array(
    z.object({
      capacity: z.string(),
      price: z.number(),
    })
  ),
  similarProducts: z.array(
    z.object({
      id: z.string(),
      brand: z.string(),
      name: z.string(),
      basePrice: z.number(),
      imageUrl: z.string().url(),
    })
  ),
});

export type ProductDetails = z.infer<typeof productDetailsSchema>;
