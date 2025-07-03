import React, { useState } from "react";

import "react-loading-skeleton/dist/skeleton.css";

import "./ProductInfo.scss";

import Button from "@/components/ui/Button";
import { useCart } from "@/context/useCart";
import type { ProductDetails } from "@/schemas/productDetailSchema";

import ColorOptions from "./ColorOptions";
import ImageDisplay from "./ImageDisplay";
import PriceDisplay from "./PriceDisplay";
import StorageOptions from "./StorageOptions";
import { useProductPrice } from "./useProductPrice";

interface ProductInfoProps {
  product: ProductDetails | null;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<number | null>(null);
  const [added, setAdded] = useState(false);
  const [imgHeights, setImgHeights] = useState<Record<string, number>>({});
  const { addToCart } = useCart();

  const canAddToCart =
    product && selectedColor !== null && selectedStorage !== null;

  const { currentPrice, priceLoading, priceError } = useProductPrice(
    product,
    selectedColor,
    selectedStorage
  );

  const key = React.useMemo(
    () => `${product?.id}-${selectedColor}-${selectedStorage}`,
    [product?.id, selectedColor, selectedStorage]
  );

  const isAnyImageTall = React.useMemo(
    () => Object.values(imgHeights).some((h) => h >= 1300),
    [imgHeights]
  );

  const imageContainerClass = isAnyImageTall
    ? "product-info__image--tall"
    : "product-info__image";

  const showPrice = Boolean(
    canAddToCart && currentPrice !== null && !priceLoading && !priceError
  );

  const handleAddToCart = () => {
    if (!product || selectedColor === null || selectedStorage === null) {
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      brand: product.brand,
      imageUrl: product.colorOptions[selectedColor].imageUrl,
      storage: product.storageOptions[selectedStorage].capacity,
      color: product.colorOptions[selectedColor].name,
      price: currentPrice ?? 0,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <section className="product-info wrapper">
      <ImageDisplay
        imageContainerClass={imageContainerClass}
        imgHeights={imgHeights}
        keyStr={key}
        product={product}
        selectedColor={selectedColor}
        selectedStorage={selectedStorage}
        setImgHeights={setImgHeights}
      />
      <div className="product-info__right">
        <div className="product-info__right-info">
          <h1
            className="product-info__right-info-title"
            data-cy="product-title"
          >
            {product?.name}
          </h1>
          <PriceDisplay
            currentPrice={currentPrice}
            priceError={priceError}
            priceLoading={priceLoading}
            showPrice={showPrice}
          />
          <StorageOptions
            product={product}
            selectedStorage={selectedStorage}
            setSelectedStorage={setSelectedStorage}
          />
          <ColorOptions
            product={product}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </div>
        <div className="product-info__right-add-to-cart">
          <Button
            className="product-info__right-add-to-cart-button"
            disabled={!canAddToCart || added}
            variant="black"
            onClick={handleAddToCart}
          >
            {added ? "Added!" : "Add to cart"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;
