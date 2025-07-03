import React from "react";

import { MemoryRouter } from "react-router-dom";

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import CartPage from "./CartPage";

let cart: any[] = [];

vi.mock("@/context/useCart", () => ({
  useCart: () => ({
    cart,
    addToCart: vi.fn(),
    removeFromCart: vi.fn(),
    updateQuantity: vi.fn(),
    clearCart: vi.fn(),
  }),
}));

const customRender = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe("Cart page", () => {
  beforeEach(() => {
    cart = [];
  });

  it("shows empty cart", () => {
    customRender(<CartPage />);
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
    expect(screen.getByText("Cart (0)")).toBeInTheDocument();
    expect(screen.getByText("Continue shopping")).toBeInTheDocument();
    expect(screen.queryByText("Pay")).not.toBeInTheDocument();
  });

  it("shows cart items and total", () => {
    cart = [
      {
        id: "1",
        name: "Test Product",
        brand: "Test Brand",
        imageUrl: "test.png",
        storage: "128GB",
        color: "Red",
        price: 100,
        quantity: 2,
      },
    ];
    customRender(<CartPage />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Cart (2)")).toBeInTheDocument();
    expect(screen.getByText("Pay")).toBeInTheDocument();
    expect(screen.getByText("Continue shopping")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("200.00 Eur")).toBeInTheDocument();
  });
});
