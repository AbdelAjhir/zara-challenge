import { MemoryRouter } from "react-router-dom";

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import Header from ".";

vi.mock("@/assets/cart.png", () => ({ default: "cart.png" }));
vi.mock("@/assets/empty_cart.png", () => ({ default: "empty_cart.png" }));
vi.mock("@/assets/logo.png", () => ({ default: "logo.png" }));

describe("Header part", () => {
  it("shows logo and cart", () => {
    render(
      <MemoryRouter>
        <Header cartCount={0} />
      </MemoryRouter>
    );
    expect(screen.getByAltText("Zara Home")).toBeInTheDocument();
    expect(screen.getByAltText("Cart")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("shows cart icon with number if cart is not empty", () => {
    render(
      <MemoryRouter>
        <Header cartCount={2} />
      </MemoryRouter>
    );
    const cartImg = screen.getByAltText("Cart");
    expect(cartImg).toHaveAttribute("src", "cart.png");
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("shows empty cart icon if cart is empty", () => {
    render(
      <MemoryRouter>
        <Header cartCount={0} />
      </MemoryRouter>
    );
    const cartImg = screen.getByAltText("Cart");
    expect(cartImg).toHaveAttribute("src", "empty_cart.png");
  });

  it("links logo to home and cart to cart page", () => {
    render(
      <MemoryRouter>
        <Header cartCount={1} />
      </MemoryRouter>
    );
    expect(screen.getByRole("link", { name: /zara home/i })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: /cart/i })).toHaveAttribute(
      "href",
      "/cart"
    );
  });
});
