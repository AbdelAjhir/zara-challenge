import type { CartItem } from "@/schemas/cartSchema";

export interface CartContextType {
  cart: CartItem[];
  addToCart: (_item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (_item: Omit<CartItem, "quantity">) => void;
  updateQuantity: (_item: CartItem) => void;
  clearCart: () => void;
}
