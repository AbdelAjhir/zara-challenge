import { useState, useCallback } from "react";

import { AnimatePresence, motion } from "framer-motion";

import "./CartProductsList.scss";
import { useCart } from "@/context/useCart";

import CartProductItem from "./CartProductItem";

const EmptyCartMessage = () => (
  <AnimatePresence>
    <motion.div
      animate={{ opacity: 1 }}
      className="cart-products-list__empty"
      data-cy="cart-empty"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      Your cart is empty.
    </motion.div>
  </AnimatePresence>
);

const CartProductList = () => {
  const { cart, removeFromCart } = useCart();

  const [imgHeights, setImgHeights] = useState<Record<string, number>>({});

  const createOnImageLoad = useCallback(
    (key: string) => (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const height = e.currentTarget.naturalHeight;
      setImgHeights((prev) => {
        if (prev[key] === height) {
          return prev;
        }
        return { ...prev, [key]: height };
      });
    },
    []
  );

  if (cart.length === 0) {
    return <EmptyCartMessage />;
  }

  return (
    <article className="cart-products-list">
      <AnimatePresence>
        {cart.map((item) => {
          const key = `${item.id}-${item.storage}-${item.color}`;
          const isTall = imgHeights[key] && imgHeights[key] >= 1300;
          const imageClass = `cart-products-list__item-image${isTall ? " tall" : ""}`;

          return (
            <motion.div
              layout
              animate={{ opacity: 1, x: 0 }}
              className="cart-products-list__item"
              exit={{ opacity: 0, x: -40 }}
              initial={{ opacity: 0, x: 40 }}
              key={key}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <CartProductItem
                imageClass={imageClass}
                item={item}
                onDelete={() => removeFromCart(item)}
                onImageLoad={createOnImageLoad(key)}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </article>
  );
};

export default CartProductList;
