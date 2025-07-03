import React from "react";

import CartProductsList from "@/components/Cart/CartProductsList";
import Footer from "@/components/Cart/Footer";
import Headline from "@/components/ui/Headline";
import { useCart } from "@/context/useCart";

const CartPage: React.FC = () => {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div className="cart-page container page">
      <Headline title={`Cart (${cartCount})`} />
      <CartProductsList />
      <Footer />
    </div>
  );
};

export default CartPage;
