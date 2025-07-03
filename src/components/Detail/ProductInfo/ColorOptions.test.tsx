import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { mockProduct } from "@/mocks/mockProduct";

import ColorOptions from "./ColorOptions";

const setup = (
  selectedColor: number | null = null,
  setSelectedColor = vi.fn()
) => {
  render(
    <ColorOptions
      product={mockProduct}
      selectedColor={selectedColor}
      setSelectedColor={setSelectedColor}
    />
  );
  return { setSelectedColor };
};

describe("ColorOptions", () => {
  it("renders all color swatches (basic render)", () => {
    setup();
    mockProduct.colorOptions.forEach((option) => {
      expect(screen.getByTitle(option.name)).toBeInTheDocument();
    });
  });

  it("calls setSelectedColor when a swatch is clicked (interaction)", () => {
    const setSelectedColor = vi.fn();
    setup(null, setSelectedColor);
    const swatch = screen.getByTitle(mockProduct.colorOptions[1].name);
    fireEvent.click(swatch);
    expect(setSelectedColor).toHaveBeenCalledWith(1);
  });

  it("shows selected color name when a color is selected (regression)", () => {
    setup(0);
    expect(
      screen.getByText(mockProduct.colorOptions[0].name)
    ).toBeInTheDocument();
  });
});
