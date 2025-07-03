import React from "react";

import type { ProductDetails } from "@/schemas/productDetailSchema";

interface ColorOptionsProps {
  product: ProductDetails | null;
  selectedColor: number | null;
  setSelectedColor: React.Dispatch<React.SetStateAction<number | null>>;
}

const ColorOptions: React.FC<ColorOptionsProps> = React.memo(
  ({ product, selectedColor, setSelectedColor }) => (
    <div className="product-info__right-info-color">
      <span className="product-info__right-info-color-title">
        Pick your favourite
      </span>
      <div className="product-info__right-info-color-swatches">
        {product?.colorOptions.map((option, idx) => (
          <div
            className={`product-info__right-info-color-swatch${selectedColor === idx ? " selected" : ""}`}
            data-cy="color-option"
            key={option.name}
            style={{ backgroundColor: option.hexCode }}
            title={option.name}
            onClick={() => setSelectedColor(idx)}
          />
        ))}
      </div>
      <div className="product-info__right-info-color-selected">
        {selectedColor !== null
          ? product?.colorOptions[selectedColor].name
          : ""}
      </div>
    </div>
  )
);

export default ColorOptions;
