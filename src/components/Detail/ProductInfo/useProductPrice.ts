import { useState, useEffect } from "react";

import { getProductDetails } from "@/api/productApi";
import type { ProductDetails } from "@/schemas/productDetailSchema";

export function useProductPrice(
  product: ProductDetails | null,
  selectedColor: number | null,
  selectedStorage: number | null
) {
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [priceLoading, setPriceLoading] = useState(false);
  const [priceError, setPriceError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    const fetchPrice = async () => {
      setPriceError(null);
      if (product && selectedColor !== null && selectedStorage !== null) {
        setPriceLoading(true);
        try {
          const { data } = await getProductDetails(product.id);
          if (!ignore) {
            setCurrentPrice(data.storageOptions[selectedStorage].price);
          }
        } catch {
          if (!ignore) {
            setCurrentPrice(null);
            setPriceError("Failed to fetch price. Please try again.");
          }
        } finally {
          if (!ignore) {
            setPriceLoading(false);
          }
        }
      } else {
        setCurrentPrice(null);
      }
    };
    fetchPrice();
    return () => {
      ignore = true;
    };
  }, [product, selectedColor, selectedStorage]);

  return {
    currentPrice,
    priceLoading,
    priceError,
    setCurrentPrice,
    setPriceError,
    setPriceLoading,
  };
}
