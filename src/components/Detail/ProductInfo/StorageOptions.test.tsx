import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { mockProduct } from "@/mocks/mockProduct";

import StorageOptions from "./StorageOptions";

const setup = (
  selectedStorage: number | null = null,
  setSelectedStorage = vi.fn()
) => {
  render(
    <StorageOptions
      product={mockProduct}
      selectedStorage={selectedStorage}
      setSelectedStorage={setSelectedStorage}
    />
  );
  return { setSelectedStorage };
};

describe("StorageOptions", () => {
  // This test checks that all storage options are rendered
  it("renders all storage options (basic render)", () => {
    setup();
    mockProduct.storageOptions.forEach((option) => {
      expect(screen.getByText(option.capacity)).toBeInTheDocument();
    });
  });

  it("calls setSelectedStorage when an option is clicked (interaction)", () => {
    const setSelectedStorage = vi.fn();
    setup(null, setSelectedStorage);
    const option = screen.getByText(mockProduct.storageOptions[1].capacity);
    fireEvent.click(option);
    expect(setSelectedStorage).toHaveBeenCalledWith(1);
  });

  it("applies selected class to the selected option (regression)", () => {
    setup(0);
    const option = screen.getByText(mockProduct.storageOptions[0].capacity);
    expect(option.className).toMatch(/selected/);
  });
});
