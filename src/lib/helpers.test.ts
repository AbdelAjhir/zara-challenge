import { describe, expect, it, vi } from "vitest";

import { fetchUniqueProducts, removeDuplicatedProducts } from "./helpers";

describe("fetchUniqueProducts", () => {
  it("gets only unique products", async () => {
    const fetchFn = vi
      .fn()
      .mockResolvedValueOnce({
        data: [
          { id: "1", name: "A" },
          { id: "2", name: "B" },
        ],
      })
      .mockResolvedValueOnce({ data: [] });
    const result = await fetchUniqueProducts(fetchFn, 3);
    expect(result).toHaveLength(2);
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });
});

describe("removeDuplicatedProducts", () => {
  it("removes duplicates", () => {
    const products = [
      { id: "1", name: "A" },
      { id: "2", name: "B" },
      { id: "1", name: "A" },
    ];
    const result = removeDuplicatedProducts(products as any);
    expect(result).toHaveLength(2);
    expect(result.map((p: any) => p.id)).toEqual(["1", "2"]);
  });

  it("gives empty array if input is empty", () => {
    const result = removeDuplicatedProducts([]);
    expect(result).toEqual([]);
  });
});
