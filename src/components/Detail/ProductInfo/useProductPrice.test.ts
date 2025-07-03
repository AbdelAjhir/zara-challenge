import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import * as productApi from "@/api/productApi";
import { mockProduct } from "@/mocks/mockProduct";

import { useProductPrice } from "./useProductPrice";

vi.mock("@/api/productApi", () => ({
  getProductDetails: vi.fn(),
}));

describe("useProductPrice", () => {
  beforeEach(() => {
    (productApi.getProductDetails as any).mockReset();
  });

  it("returns null price if product or options are not selected (empty state)", async () => {
    const { result } = renderHook(() => useProductPrice(null, null, null));
    expect(result.current.currentPrice).toBeNull();
    expect(result.current.priceLoading).toBe(false);
  });

  it("fetches and sets price when options are selected ", async () => {
    (productApi.getProductDetails as any).mockResolvedValueOnce({
      data: mockProduct,
    });
    const { result } = renderHook(() => useProductPrice(mockProduct, 0, 1));
    await act(async () => {
      await Promise.resolve();
    });
    expect(productApi.getProductDetails).toHaveBeenCalledWith("SMG-S24U");
    expect(result.current.currentPrice).toBe(1329);
    expect(result.current.priceLoading).toBe(false);
    expect(result.current.priceError).toBeNull();
  });

  it("sets error if fetch fails (error state)", async () => {
    (productApi.getProductDetails as any).mockRejectedValueOnce(
      new Error("fail")
    );
    const { result } = renderHook(() => useProductPrice(mockProduct, 0, 1));
    await act(async () => {
      await Promise.resolve();
    });
    expect(result.current.currentPrice).toBeNull();
    expect(result.current.priceError).toMatch(/failed to fetch price/i);
    expect(result.current.priceLoading).toBe(false);
  });
});
