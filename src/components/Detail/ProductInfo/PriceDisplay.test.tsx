import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import PriceDisplay from "./PriceDisplay";

vi.mock("react-loading-skeleton", () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="skeleton" {...props} />,
}));

describe("PriceDisplay", () => {
  it("shows price if showPrice is true", () => {
    render(
      <PriceDisplay
        currentPrice={1234}
        priceError={null}
        priceLoading={false}
        showPrice={true}
      />
    );
    expect(screen.getByText(/from 1234/i)).toBeInTheDocument();
    expect(screen.getByText(/eur/i)).toBeInTheDocument();
  });

  it("shows skeleton when loading", () => {
    render(
      <PriceDisplay
        currentPrice={null}
        priceError={null}
        priceLoading={true}
        showPrice={false}
      />
    );
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("shows error message if priceError is set", () => {
    render(
      <PriceDisplay
        currentPrice={null}
        priceError="Error!"
        priceLoading={false}
        showPrice={false}
      />
    );
    expect(screen.getByText("Error!")).toBeInTheDocument();
    expect(screen.getByText("Error!").className).toMatch(/error/);
  });

  it("shows nothing if no price, not loading, and no error", () => {
    const { container } = render(
      <PriceDisplay
        currentPrice={null}
        priceError={null}
        priceLoading={false}
        showPrice={false}
      />
    );
    const emptyDiv = container.querySelector(".product-info__right-info-price");
    expect(emptyDiv).toBeEmptyDOMElement();
  });
});
