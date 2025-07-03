import { MemoryRouter, Route, Routes } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, type Mocked } from "vitest";

import * as productApi from "@/api/productApi";
import { CartProvider } from "@/context/CartContext.tsx";
import { mockProduct } from "@/mocks/mockProduct";

import DetailPage from "./DetailPage";

vi.mock("@/api/productApi");
const mockedProductApi = productApi as Mocked<typeof productApi>;

const renderWithProviders = (route: string = "/products/1") => {
  const queryClient = new QueryClient();
  window.history.pushState({}, "", route);
  return render(
    <MemoryRouter initialEntries={[route]}>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <Routes>
            <Route element={<DetailPage />} path="/products/:id" />
          </Routes>
        </CartProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe("Detail page", () => {
  it("shows loading", () => {
    // @ts-ignore
    mockedProductApi.getProductDetails.mockReturnValue(new Promise(() => {}));
    renderWithProviders();
    expect(document.querySelector(".spinner")).toBeInTheDocument();
  });

  it("shows not found if API returns 404", async () => {
    // @ts-ignore
    const error: any = new Error("Not found");
    error.status = 404;
    mockedProductApi.getProductDetails.mockRejectedValue(error);
    renderWithProviders();
    expect(await screen.findByText("Product Not Found")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Sorry, the product you're looking for doesn't exist or has been removed."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Browse products" })
    ).toBeInTheDocument();
  });

  it("shows error if API fails", async () => {
    // @ts-ignore
    mockedProductApi.getProductDetails.mockRejectedValue(
      new Error("API Error!")
    );
    renderWithProviders();
    expect(
      await screen.findByText("Error Fetching Product")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "There was an error fetching the product. Please try again later."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Back to home" })
    ).toBeInTheDocument();
  });

  it("shows product details if API works", async () => {
    // @ts-ignore
    mockedProductApi.getProductDetails.mockResolvedValue({ data: mockProduct });
    renderWithProviders();
    expect(
      await screen.findByRole("heading", { name: mockProduct.name })
    ).toBeInTheDocument();
    expect(screen.getAllByText(mockProduct.brand).length).toBeGreaterThan(0);
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText("Specifications")).toBeInTheDocument();
    expect(screen.getByText("Similar Items")).toBeInTheDocument();
    expect(screen.getByText("Back")).toBeInTheDocument();
  });
});
