import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { CartContext } from "@/context/CartContext";
import { mockProduct } from "@/mocks/mockProduct";

import CartProductItem from "./CartProductItem";
import CartProductList from "./CartProductsList";

describe("Cart product item", () => {
  const item = {
    id: mockProduct.id,
    name: mockProduct.name,
    brand: mockProduct.brand,
    storage: mockProduct.storageOptions[0].capacity,
    color: mockProduct.colorOptions[0].name,
    price: mockProduct.basePrice,
    quantity: 2,
    imageUrl: mockProduct.colorOptions[0].imageUrl,
  };

  it.skip("shows product info and quantity", () => {
    render(
      <CartProductItem
        imageClass="test-class"
        item={item}
        onDelete={vi.fn()}
        onImageLoad={vi.fn()}
      />
    );
    expect(screen.getByText(item.name)).toBeInTheDocument();
    expect(screen.getByText(`${item.storage} |`)).toBeInTheDocument();
    expect(screen.getByText(item.color)).toBeInTheDocument();
    expect(screen.getByText(`${item.price} Eur`)).toBeInTheDocument();
    expect(screen.getByText("× 2")).toBeInTheDocument();
  });

  it.skip("shows quantity if more than 1", () => {
    render(
      <CartProductItem
        imageClass="test-class"
        item={{ ...item, quantity: 3 }}
        onDelete={vi.fn()}
        onImageLoad={vi.fn()}
      />
    );
    expect(screen.getByText("× 3")).toBeInTheDocument();
  });

  it("removes item when delete is clicked", () => {
    const onDelete = vi.fn();
    render(
      <CartProductItem
        imageClass="test-class"
        item={item}
        onDelete={onDelete}
        onImageLoad={vi.fn()}
      />
    );
    fireEvent.click(screen.getByText("Delete"));
    expect(onDelete).toHaveBeenCalled();
  });

  it.skip("calls onImageLoad when image loads", () => {
    const onImageLoad = vi.fn();
    render(
      <CartProductItem
        imageClass="test-class"
        item={item}
        onDelete={vi.fn()}
        onImageLoad={onImageLoad}
      />
    );
    fireEvent.load(screen.getByAltText(item.name));
    expect(onImageLoad).toHaveBeenCalled();
  });

  it.todo("does not show quantity if only 1");
});

const cartItem = {
  id: mockProduct.id,
  name: mockProduct.name,
  storage: mockProduct.storageOptions[0].capacity,
  color: mockProduct.colorOptions[0].name,
  price: mockProduct.basePrice,
  quantity: 1,
  imageUrl: mockProduct.colorOptions[0].imageUrl,
};

describe("Cart product list", () => {
  vi.mock("./CartProductItem", () => ({
    default: (props: any) => (
      <div data-testid="cart-product-item-mock">
        {props.item.name}
        <button type="button" onClick={props.onDelete}>
          Delete
        </button>
      </div>
    ),
  }));

  function renderWithCartContext(contextValue: any) {
    return render(
      <CartContext value={contextValue}>
        <CartProductList />
      </CartContext>
    );
  }

  it("shows message if cart is empty", () => {
    renderWithCartContext({
      cart: [],
      removeFromCart: vi.fn(),
      addToCart: vi.fn(),
      updateQuantity: vi.fn(),
      clearCart: vi.fn(),
    });
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it("shows all products in cart", () => {
    const cart = [cartItem, { ...cartItem, id: "2", name: "Another Product" }];
    renderWithCartContext({
      cart,
      removeFromCart: vi.fn(),
      addToCart: vi.fn(),
      updateQuantity: vi.fn(),
      clearCart: vi.fn(),
    });
    expect(screen.getAllByTestId("cart-product-item-mock")).toHaveLength(2);
    expect(screen.getByText("Galaxy S24 Ultra")).toBeInTheDocument();
    expect(screen.getByText("Another Product")).toBeInTheDocument();
  });

  it("removes item when delete is clicked", () => {
    const cart = [cartItem];
    const removeFromCart = vi.fn();
    renderWithCartContext({
      cart,
      removeFromCart,
      addToCart: vi.fn(),
      updateQuantity: vi.fn(),
      clearCart: vi.fn(),
    });
    fireEvent.click(screen.getByText("Delete"));
    expect(removeFromCart).toHaveBeenCalledWith(cart[0]);
  });
});
