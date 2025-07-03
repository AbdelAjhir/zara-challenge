import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, beforeEach } from "vitest";

import { mockProduct } from "@/mocks/mockProduct";
import type { CartItem } from "@/schemas/cartSchema.ts";

import { CartProvider } from "./CartContext.tsx";
import { useCart } from "./useCart";

const TEST_ITEM: Omit<CartItem, "quantity"> = {
  id: mockProduct.id,
  name: mockProduct.name,
  brand: mockProduct.brand,
  imageUrl: mockProduct.colorOptions[0].imageUrl,
  storage: mockProduct.storageOptions[0].capacity,
  color: mockProduct.colorOptions[0].name,
  price: mockProduct.storageOptions[1].price,
};

const TestComponent = () => {
  const { cart, addToCart } = useCart();
  return (
    <>
      <button type="button" onClick={() => addToCart(TEST_ITEM)}>
        Add
      </button>
      <div data-testid="cart-length">{cart.length}</div>
      {cart.map((item) => (
        <div data-testid="cart-item" key={item.id + item.color + item.storage}>
          {item.name} - {item.color} - {item.storage} - Qty: {item.quantity} -
          {item.price} - {item.brand} - {item.imageUrl} - {item.id}
        </div>
      ))}
    </>
  );
};

describe("CartProvider", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("adds an item to the cart (basic happy path)", async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId("cart-length")).toHaveTextContent("0");

    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getByTestId("cart-length")).toHaveTextContent("1");

    const cartItem = screen.getByTestId("cart-item");
    expect(cartItem).toHaveTextContent("Galaxy S24 Ultra");
    expect(cartItem).toHaveTextContent("Qty: 1");
    expect(cartItem).toHaveTextContent("Titanium Violet");
    expect(cartItem).toHaveTextContent("256 GB");
    expect(cartItem).toHaveTextContent("1329");
    expect(cartItem).toHaveTextContent("Samsung");
    expect(cartItem).toHaveTextContent(
      "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-violet.webp"
    );
    expect(cartItem).toHaveTextContent("SMG-S24U");
  });

  it("adds the same item again (should increase quantity, regression)", async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    await user.click(screen.getByRole("button", { name: "Add" }));
    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getByTestId("cart-length")).toHaveTextContent("1");
    const cartItem = screen.getByTestId("cart-item");
    expect(cartItem).toHaveTextContent("Qty: 2");
  });

  it("removes an item from the cart (delete flow)", async () => {
    const user = userEvent.setup();
    const RemoveComponent = () => {
      const { cart, addToCart, removeFromCart } = useCart();
      return (
        <>
          <button type="button" onClick={() => addToCart(TEST_ITEM)}>
            Add
          </button>
          <button type="button" onClick={() => removeFromCart(TEST_ITEM)}>
            Remove
          </button>
          <div data-testid="cart-length">{cart.length}</div>
        </>
      );
    };
    render(
      <CartProvider>
        <RemoveComponent />
      </CartProvider>
    );
    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getByTestId("cart-length")).toHaveTextContent("1");
    await user.click(screen.getByRole("button", { name: "Remove" }));
    expect(screen.getByTestId("cart-length")).toHaveTextContent("0");
  });

  it("changes the quantity of an item (set quantity directly)", async () => {
    const user = userEvent.setup();
    const QuantityComponent = () => {
      const { cart, addToCart, updateQuantity } = useCart();
      return (
        <>
          <button type="button" onClick={() => addToCart(TEST_ITEM)}>
            Add
          </button>
          <button
            type="button"
            onClick={() => updateQuantity({ ...TEST_ITEM, quantity: 5 })}
          >
            SetQty5
          </button>
          <div data-testid="cart-length">{cart.length}</div>
          {cart.map((item) => (
            <div
              data-testid="cart-item"
              key={item.id + item.color + item.storage}
            >
              Qty: {item.quantity}
            </div>
          ))}
        </>
      );
    };
    render(
      <CartProvider>
        <QuantityComponent />
      </CartProvider>
    );
    await user.click(screen.getByRole("button", { name: "Add" }));
    await user.click(screen.getByRole("button", { name: "SetQty5" }));
    expect(screen.getByTestId("cart-item")).toHaveTextContent("Qty: 5");
  });

  it("clears the cart (empty state)", async () => {
    const user = userEvent.setup();
    const ClearComponent = () => {
      const { cart, addToCart, clearCart } = useCart();
      return (
        <>
          <button type="button" onClick={() => addToCart(TEST_ITEM)}>
            Add
          </button>
          <button type="button" onClick={clearCart}>
            Clear
          </button>
          <div data-testid="cart-length">{cart.length}</div>
        </>
      );
    };
    render(
      <CartProvider>
        <ClearComponent />
      </CartProvider>
    );
    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getByTestId("cart-length")).toHaveTextContent("1");
    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(screen.getByTestId("cart-length")).toHaveTextContent("0");
  });

  it("does not crash when removing a non-existent item (edge case)", async () => {
    const user = userEvent.setup();
    const RemoveComponent = () => {
      const { cart, removeFromCart } = useCart();
      return (
        <>
          <button type="button" onClick={() => removeFromCart(TEST_ITEM)}>
            Remove
          </button>
          <div data-testid="cart-length">{cart.length}</div>
        </>
      );
    };
    render(
      <CartProvider>
        <RemoveComponent />
      </CartProvider>
    );
    expect(screen.getByTestId("cart-length")).toHaveTextContent("0");
    await user.click(screen.getByRole("button", { name: "Remove" }));
    expect(screen.getByTestId("cart-length")).toHaveTextContent("0");
  });

  it("removes item if quantity is set to 0", async () => {
    const user = userEvent.setup();
    const QuantityComponent = () => {
      const { cart, addToCart, updateQuantity } = useCart();
      return (
        <>
          <button type="button" onClick={() => addToCart(TEST_ITEM)}>
            Add
          </button>
          <button
            type="button"
            onClick={() => updateQuantity({ ...TEST_ITEM, quantity: 0 })}
          >
            SetQty0
          </button>
          <div data-testid="cart-length">{cart.length}</div>
        </>
      );
    };
    render(
      <CartProvider>
        <QuantityComponent />
      </CartProvider>
    );
    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getByTestId("cart-length")).toHaveTextContent("1");
    await user.click(screen.getByRole("button", { name: "SetQty0" }));
    expect(screen.getByTestId("cart-length")).toHaveTextContent("0");
  });
});
