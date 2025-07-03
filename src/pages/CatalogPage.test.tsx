import { MemoryRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import * as productApi from "@/api/productApi";

import CatalogPage from "./CatalogPage";

vi.mock("@/api/productApi");

const renderWithQuery = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </MemoryRouter>
  );
};

describe("CatalogPage", () => {
  it("shows loading state while fetching products", () => {
    // @ts-ignore
    productApi.getProducts.mockReturnValue(new Promise(() => {}));
    renderWithQuery(<CatalogPage />);
    expect(document.querySelector(".spinner")).toBeInTheDocument();
  });

  it("renders products when API returns data", async () => {
    const mockProducts = [
      {
        id: "1",
        name: "Test Product",
        brand: "Test Brand",
        imageUrl: "https://example.com/test.png",
        basePrice: 100,
      },
    ];
    // @ts-ignore
    productApi.getProducts.mockResolvedValue({ data: mockProducts });
    renderWithQuery(<CatalogPage />);
    expect(await screen.findByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test Brand")).toBeInTheDocument();
  });

  it("shows error state when API fails", async () => {
    // @ts-ignore
    productApi.getProducts.mockRejectedValue(new Error("API Error!"));
    renderWithQuery(<CatalogPage />);
    expect(
      await screen.findByText(
        "There was an error loading the products. Please try again later."
      )
    ).toBeInTheDocument();
  });

  it("shows empty state when no products are returned", async () => {
    // @ts-ignore
    productApi.getProducts.mockResolvedValue({ data: [] });
    renderWithQuery(<CatalogPage />);
    expect(await screen.findByText("No products found.")).toBeInTheDocument();
  });
});
