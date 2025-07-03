import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { mockProduct } from "@/mocks/mockProduct";

import ProductsList from "./ProductsList";

describe("ProductsList", () => {
  vi.mock("./ProductItem/ProductItem", () => ({
    default: (props: any) => (
      <li data-testid="product-item-mock">{props.item.name}</li>
    ),
  }));

  const minimalMockProduct = {
    id: mockProduct.id,
    name: mockProduct.name,
    brand: mockProduct.brand,
    basePrice: mockProduct.basePrice,
    imageUrl: mockProduct.colorOptions[0].imageUrl,
  };

  const anotherProduct = {
    id: "2",
    name: "Another Phone",
    brand: "BrandB",
    basePrice: 200,
    imageUrl: "http://img.com/2.jpg",
  };

  const products = [minimalMockProduct, anotherProduct];

  it("shows loading spinner when isLoading is true", () => {
    render(<ProductsList error={null} isLoading={true} products={[]} />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows error message if error is present", () => {
    render(
      <ProductsList error={new Error("fail")} isLoading={false} products={[]} />
    );
    expect(
      screen.getByText(/there was an error loading the products/i)
    ).toBeInTheDocument();
  });

  it("shows empty message if no products are found", () => {
    render(<ProductsList error={null} isLoading={false} products={[]} />);
    expect(screen.getByText(/no products found/i)).toBeInTheDocument();
  });

  it("renders all product items in the list (regression)", () => {
    render(<ProductsList error={null} isLoading={false} products={products} />);
    expect(screen.getByText(minimalMockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(anotherProduct.name)).toBeInTheDocument();
  });
});
