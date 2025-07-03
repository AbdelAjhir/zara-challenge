import api from "@/lib/axios";
import { productDetailsSchema } from "@/schemas/productDetailSchema";
import { productsSchema } from "@/schemas/productSchema";

export const DEFAULT_PRODUCT_LIMIT = 20;

export const getProducts = async (
  limit = DEFAULT_PRODUCT_LIMIT,
  offset = 0
) => {
  try {
    const response = await api.get(`/products?limit=${limit}&offset=${offset}`);
    const parsed = productsSchema.safeParse(response.data);
    if (!parsed.success) {
      throw new Error("Invalid products data");
    }
    return { data: parsed.data };
  } catch (error: any) {
    const status = error?.response?.status;
    const message =
      error?.message || "An error occurred while fetching products";
    const err = new Error(message);
    // @ts-ignore
    err.status = status;
    throw err;
  }
};

export const getProductsByBrandOrName = async (
  search: string,
  limit = DEFAULT_PRODUCT_LIMIT,
  offset = 0
) => {
  try {
    const response = await api.get(
      `/products?search=${search}&limit=${limit}&offset=${offset}`
    );
    const parsed = productsSchema.safeParse(response.data);
    if (!parsed.success) {
      throw new Error("Invalid products data");
    }
    return { data: parsed.data };
  } catch (error: any) {
    const status = error?.response?.status;
    const message =
      error?.message || "An error occurred while fetching products";
    const err = new Error(message);
    // @ts-ignore
    err.status = status;
    throw err;
  }
};

export const getProductDetails = async (id: string) => {
  try {
    const response = await api.get(`/products/${id}`);
    const parsed = productDetailsSchema.safeParse(response.data);

    if (!parsed.success) {
      throw new Error("Invalid product details data");
    }
    return { data: parsed.data };
  } catch (error: any) {
    const status = error?.response?.status;
    const message =
      error?.message ||
      `An error occurred while fetching product details for id ${id}`;
    const err = new Error(message);
    // @ts-ignore
    err.status = status;
    throw err;
  }
};
