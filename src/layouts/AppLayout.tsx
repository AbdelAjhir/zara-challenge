import { useMemo } from "react";

import { Outlet } from "react-router-dom";

import Header from "@/components/Header";
import { useCart } from "@/context/useCart";
import "./AppLayout.scss";

const AppLayout = () => {
  const { cart } = useCart();
  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  return (
    <>
      <Header cartCount={cartCount} />
      <Outlet />
    </>
  );
};

export default AppLayout;
