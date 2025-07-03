import React from "react";

import { Link } from "react-router-dom";

import cart from "@/assets/cart.png";
import emptyCart from "@/assets/empty_cart.png";
import logo from "@/assets/logo.png";

import "./Header.scss";

const Header: React.FC<{ cartCount?: number }> = React.memo(
  ({ cartCount = 0 }) => {
    return (
      <header className="header">
        <nav className="container header__nav">
          <Link className="header__logo" prefetch="intent" to="/">
            <img alt="Zara Home" src={logo} />
          </Link>
          <Link
            className="header__cart"
            data-cy="cart-link"
            prefetch="intent"
            to="/cart"
          >
            <img
              alt="Cart"
              className="header__cart-icon"
              src={cartCount > 0 ? cart : emptyCart}
            />
            <span className="header__cart-count" data-cy="cart-badge">
              {cartCount}
            </span>
          </Link>
        </nav>
      </header>
    );
  }
);

export default Header;
