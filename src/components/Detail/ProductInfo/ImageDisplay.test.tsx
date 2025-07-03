import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { mockProduct } from "@/mocks/mockProduct";

import ImageDisplay from "./ImageDisplay";

describe("ImageDisplay", () => {
  const baseProps = {
    product: mockProduct,
    selectedStorage: 0,
    setImgHeights: vi.fn(),
    keyStr: "test-key",
    imageContainerClass: "test-class",
    imgHeights: {},
  };

  it("renders the image for the default color if none is selected", () => {
    render(<ImageDisplay {...baseProps} selectedColor={null} />);
    const img = screen.getByAltText("product");
    expect(img).toHaveAttribute("src", mockProduct.colorOptions[0].imageUrl);
  });

  it("renders the image for the selected color", () => {
    render(<ImageDisplay {...baseProps} selectedColor={1} />);
    const img = screen.getByAltText("product");
    expect(img).toHaveAttribute("src", mockProduct.colorOptions[1].imageUrl);
  });

  it("calls setImgHeights on image load (regression)", () => {
    const setImgHeights = vi.fn();
    render(
      <ImageDisplay
        {...baseProps}
        selectedColor={0}
        setImgHeights={setImgHeights}
      />
    );
    const img = screen.getByAltText("product");
    Object.defineProperty(img, "naturalHeight", {
      configurable: true,
      value: 1234,
    });
    fireEvent.load(img);
    expect(setImgHeights).toHaveBeenCalledWith(expect.any(Function));
  });
});
