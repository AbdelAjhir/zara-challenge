import { describe, it, expect, vi, beforeEach } from "vitest";

import api from "@/lib/axios";
import { mockProduct } from "@/mocks/mockProduct";
import type { Product } from "@/schemas/productSchema";

import { getProducts } from "./productApi";

vi.mock("@/lib/axios");

const mockProducts: Product[] = mockProduct.similarProducts
  .slice(0, 2)
  .map(({ id, name, brand, imageUrl, basePrice }) => ({
    id,
    name,
    brand,
    imageUrl,
    basePrice,
  }));

describe("getProducts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("gets products from API", async () => {
    // @ts-ignore
    api.get.mockResolvedValue({ data: mockProducts });
    const result = await getProducts();
    expect(result.data).toEqual(mockProducts);
  });

  it("shows error if API returns wrong data", async () => {
    // @ts-ignore
    api.get.mockResolvedValue({ data: { invalid: true } });
    await expect(getProducts()).rejects.toThrow("Invalid products data");
  });

  it("shows error if API fails", async () => {
    // @ts-ignore
    api.get.mockRejectedValue({
      response: { status: 404 },
      message: "Not found",
    });
    await expect(getProducts()).rejects.toMatchObject({
      message: "Not found",
      status: 404,
    });
  });

  it("shows error if network is down", async () => {
    // @ts-ignore
    api.get.mockRejectedValue({});
    await expect(getProducts()).rejects.toMatchObject({
      message: expect.stringContaining("An error occurred"),
    });
  });

  it("uses limit and offset when given", async () => {
    // @ts-ignore
    api.get.mockResolvedValue({ data: mockProducts });
    await getProducts(10, 20);
    expect(api.get).toHaveBeenCalledWith("/products?limit=10&offset=20");
  });
});
