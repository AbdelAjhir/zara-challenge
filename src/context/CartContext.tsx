import type { ReactNode } from "react";
import { useMemo, useCallback } from "react";

import { CartContext } from "@/context/CartContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import type { CartItem } from "@/schemas/cartSchema";
import type { CartContextType } from "@/types/cart";

const CART_KEY = "cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useLocalStorage<CartItem[]>(CART_KEY, []);

  const addToCart: CartContextType["addToCart"] = useCallback(
    (item) => {
      setCart((prev) => {
        const idx = prev.findIndex(
          (ci) =>
            ci.id === item.id &&
            ci.storage === item.storage &&
            ci.color === item.color
        );
        if (idx !== -1) {
          const updated = [...prev];
          updated[idx].quantity += 1;
          return updated;
        }
        return [...prev, { ...item, quantity: 1 }];
      });
    },
    [setCart]
  );

  const removeFromCart: CartContextType["removeFromCart"] = useCallback(
    (item) => {
      setCart((prev) =>
        prev.filter(
          (ci) =>
            !(
              ci.id === item.id &&
              ci.storage === item.storage &&
              ci.color === item.color
            )
        )
      );
    },
    [setCart]
  );

  const updateQuantity: CartContextType["updateQuantity"] = useCallback(
    (item) => {
      setCart((prev) =>
        prev
          .map((ci) =>
            ci.id === item.id &&
            ci.storage === item.storage &&
            ci.color === item.color
              ? { ...ci, quantity: item.quantity }
              : ci
          )
          .filter((ci) => ci.quantity > 0)
      );
    },
    [setCart]
  );

  const clearCart: CartContextType["clearCart"] = useCallback(
    () => setCart([]),
    [setCart]
  );

  const contextValue = useMemo(
    () => ({ cart, addToCart, removeFromCart, updateQuantity, clearCart }),
    [cart, addToCart, removeFromCart, updateQuantity, clearCart]
  );

  return <CartContext value={contextValue}>{children}</CartContext>;
};
