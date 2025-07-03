import React from "react";

import Skeleton from "react-loading-skeleton";

interface PriceDisplayProps {
  showPrice: boolean;
  currentPrice: number | null;
  priceLoading: boolean;
  priceError: string | null;
}

const PriceDisplay: React.FC<PriceDisplayProps> = React.memo(
  ({ showPrice, currentPrice, priceLoading, priceError }) => {
    if (priceLoading) {
      return <Skeleton height={28} width={129} />;
    }

    if (showPrice) {
      return (
        <div className="product-info__right-info-price">
          From {currentPrice} <span>Eur</span>
        </div>
      );
    }
    if (priceError) {
      return (
        <span className="product-info__right-info-price error">
          {priceError}
        </span>
      );
    }
    return <div className="product-info__right-info-price"></div>;
  }
);

export default PriceDisplay;
