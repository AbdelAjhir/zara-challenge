import React from "react";

import type { ProductDetails } from "@/schemas/productDetailSchema";

interface ImageDisplayProps {
  product: ProductDetails | null;
  selectedColor: number | null;
  selectedStorage: number | null;
  setImgHeights: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  keyStr: string;
  imageContainerClass: string;
  imgHeights: Record<string, number>;
}

const ImageDisplay: React.FC<ImageDisplayProps> = React.memo((props) => {
  const { product, selectedColor, setImgHeights, keyStr, imageContainerClass } =
    props;
  return (
    <div className={imageContainerClass}>
      <img
        alt="product"
        src={
          selectedColor !== null
            ? product?.colorOptions[selectedColor].imageUrl
            : product?.colorOptions[0].imageUrl
        }
        onLoad={(e) => {
          const height = e.currentTarget.naturalHeight;
          setImgHeights((prev) => {
            if (prev[keyStr] === height) {
              return prev;
            }
            return { ...prev, [keyStr]: height };
          });
        }}
      />
    </div>
  );
});

export default ImageDisplay;
