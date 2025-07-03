import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { mockProduct } from "@/mocks/mockProduct";

import Specifications from "./Specifications";

it("renders without crashing", () => {
  render(
    <Specifications
      brand={mockProduct.brand}
      description={mockProduct.description}
      name={mockProduct.name}
      specs={mockProduct.specs}
    />
  );
});

describe("Specifications", () => {
  it("renders all key specs, brand, model, and description (basic render)", () => {
    render(
      <Specifications
        brand={mockProduct.brand}
        description={mockProduct.description}
        name={mockProduct.name}
        specs={mockProduct.specs}
      />
    );
    expect(screen.getByText("Specifications")).toBeInTheDocument();
    expect(screen.getByText("Brand")).toBeInTheDocument();
    expect(screen.getByText("Samsung")).toBeInTheDocument();
    expect(screen.getByText("Model")).toBeInTheDocument();
    expect(screen.getByText("Galaxy S24 Ultra")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    Object.entries(mockProduct.specs).forEach(([key, value]) => {
      // Title is formatted (camelCase to spaced, first letter capitalized)
      const formattedKey = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
      expect(screen.getByText(formattedKey)).toBeInTheDocument();
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });
});
