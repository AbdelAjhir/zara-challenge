import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";

import { getProductDetails } from "@/api/productApi";

interface ProductItemProps {
  item: {
    id: string;
    name: string;
    brand: string;
    basePrice: string | number;
    imageUrl: string;
  };
}

const ProductItem: React.FC<ProductItemProps> = React.memo(({ item }) => {
  const navigate = useNavigate();
  const [imgHeight, setImgHeight] = useState<number>(0);
  const queryClient = useQueryClient();

  const handleClick = () => {
    navigate(`/products/${item.id}`);
  };

  const handleMouseEnter = () => {
    queryClient.prefetchQuery({
      queryKey: ["product", item.id],
      queryFn: () => getProductDetails(item.id),
      staleTime: 1000 * 60 * 5,
    });
  };

  const imageContainerClass =
    "products__item-content-image" +
    (imgHeight >= 1300 ? " extra-padding" : "");

  return (
    <motion.li
      animate={{ opacity: 1, y: 0 }}
      aria-label={`View details for ${item.brand} ${item.name}`}
      aria-pressed="false"
      className="products__item"
      data-cy="product-item"
      initial={{ opacity: 0, y: 40 }}
      key={item.id}
      role="button"
      tabIndex={0}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      <div className="products__item-content">
        <div className={imageContainerClass}>
          <img
            alt={item.name}
            src={item.imageUrl}
            onLoad={(e) => {
              const height = e.currentTarget.naturalHeight;
              setImgHeight(height);
            }}
          />
        </div>
        <div className="products__item-content-info">
          <h2 className="products__item-content-info-title">{item.brand}</h2>
          <div className="products__item-content-info-details">
            <p className="products__item-content-info-name">{item.name}</p>
            <p className="products__item-content-info-price">
              {item.basePrice} eur
            </p>
          </div>
        </div>
      </div>
    </motion.li>
  );
});

export default ProductItem;
