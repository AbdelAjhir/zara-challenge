import "./ProductsList.scss";

import React, { useMemo } from "react";

import { motion } from "framer-motion";

import Spinner from "@/components/ui/Spinner";
import type { Products } from "@/schemas/productSchema";

import ProductItem from "./ProductItem/ProductItem";

interface ProductsListProps {
  products: Products;
  isLoading: boolean;
  error: Error | null;
  isSearch?: boolean;
}

const Message: React.FC<{ type: "error" | "empty" }> = ({ type }) => (
  <div className={`products__${type} container`}>
    {type === "error"
      ? "There was an error loading the products. Please try again later."
      : "No products found."}
  </div>
);

const ProductsList: React.FC<ProductsListProps> = ({
  products,
  isLoading,
  error,
  isSearch,
}) => {
  const productsKey = useMemo(
    () => products.map((p) => p.id).join("-"),
    [products]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Message type="error" />;
  }

  if (!products?.length || products.length === 0) {
    return <Message type="empty" />;
  }

  return (
    <div className="products container">
      <motion.ul
        animate={{ opacity: 1, x: 0 }}
        className="products__list"
        initial={isSearch ? { opacity: 0, x: 40 } : { opacity: 0 }}
        key={productsKey}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {products.map((item) => (
          <ProductItem item={item} key={item.id} />
        ))}
      </motion.ul>
    </div>
  );
};

export default ProductsList;
