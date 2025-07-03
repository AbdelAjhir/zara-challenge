import { MemoryRouter } from "react-router-dom";

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom"
    );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import NotFoundPage from "./NotFoundPage";

describe("NotFoundPage", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders the not found message, icon, and button (basic render)", () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    expect(
      screen.getByText("Sorry, the page you're looking for doesn't exist.")
    ).toBeInTheDocument();
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Browse products" })
    ).toBeInTheDocument();
  });

  it("calls navigate when the button is clicked", () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole("button", { name: "Browse products" }));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
