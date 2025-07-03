import React, { useCallback, useMemo } from "react";

import { useNavigate } from "react-router-dom";

import "./Footer.scss";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/useCart";

const Footer: React.FC = React.memo(() => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );
  const isEmpty = cart.length === 0;

  const handleContinueShopping = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="footer cart-footer">
      <div className="footer__continue-shopping">
        <Button variant="white" onClick={handleContinueShopping}>
          Continue shopping
        </Button>
      </div>
      {!isEmpty && (
        <div className="footer__total">
          <div className="footer__total-total">
            <span>Total</span>
            <span>{total.toFixed(2)} Eur</span>
          </div>
          <div className="footer__total-pay">
            <Button onClick={() => {}}>Pay</Button>
          </div>
        </div>
      )}
    </div>
  );
});

export default Footer;
