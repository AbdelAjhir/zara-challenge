import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { mockProduct } from "@/mocks/mockProduct";

import SimilarItems from "./SimilarItems";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock("@/mocks/phone.json", () => ({
  default: { similarProducts: mockProduct.similarProducts },
}));

describe("SimilarItems", () => {
  it("renders the first two similar products with correct info (basic render)", () => {
    render(<SimilarItems similarProducts={mockProduct.similarProducts} />);
    mockProduct.similarProducts.forEach((item) => {
      expect(screen.getByText(item.brand)).toBeInTheDocument();
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(`${item.basePrice} eur`, "i"))
      ).toBeInTheDocument();
      expect(screen.getByAltText(item.name)).toHaveAttribute(
        "src",
        item.imageUrl
      );
    });
  });
});
