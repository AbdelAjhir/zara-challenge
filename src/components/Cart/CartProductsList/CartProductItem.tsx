import React from "react";

import type { CartItem } from "@/schemas/cartSchema";

interface CartProductItemProps {
  item: CartItem;
  imageClass: string;
  onImageLoad: (_e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onDelete: () => void;
}

const CartProductItem: React.FC<CartProductItemProps> = React.memo(
  ({ item, imageClass, onImageLoad, onDelete }) => (
    <div className="cart-products-list__item" data-cy="cart-item">
      <div className={imageClass}>
        <img alt={item.name} src={item.imageUrl} onLoad={onImageLoad} />
      </div>
      <div className="cart-products-list__item-info">
        <div className="cart-products-list__item-info-content">
          <div className="cart-products-list__item-info-content-name">
            <div className="cart-products-list__item-info-content-name-title">
              <h3>{item.name}</h3>
            </div>
            <div className="cart-products-list__item-info-content-name-storage-color">
              <span>{item.storage} | </span>
              <span>{item.color}</span>
            </div>
            <div className="cart-products-list__item-info-content-name-price">
              <span>{item.price} Eur</span>
              {item.quantity > 1 && (
                <span>
                  {" "}
                  <b>&times; {item.quantity}</b>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="cart-products-list__item-delete">
          <button
            aria-label={`Remove ${item.name} from cart`}
            data-cy="remove-from-cart"
            type="button"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
);

export default CartProductItem;
