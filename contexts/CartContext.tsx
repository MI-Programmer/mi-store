"use client";

import { createContext, ReactNode, use } from "react";

import useLocalStorage from "@/hooks/useLocalStorage";

export interface CartItemParams {
  id: string;
  name: string;
  image: string;
  price: number;
  selectedColor?: string;
  selectedSize?: { name: string; inStock: boolean };
}

interface CartItem extends CartItemParams {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  amountCart: number;
  cartItemQuantity: Function;
  totalPrice: number;
  addCartItem: (item: CartItemParams) => void;
  updateCartItem: (item: CartItemParams) => void;
  deleteCartItem: (id: string) => void;
  clearCart: () => void;
  incCartItemQuantity: (id: string) => void;
  decCartItemQuantity: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useLocalStorage("cart", []) as [
    CartItem[],
    React.Dispatch<React.SetStateAction<CartItem[]>>,
  ];

  const amountCart = cart.reduce((prev, curr) => prev + curr.quantity, 0);

  const cartItemQuantity = (id: string) =>
    cart.filter((item) => item.id === id)?.map((item) => item.quantity)[0];

  const totalPrice = cart.reduce(
    (prev, curr) => prev + curr.price * curr.quantity,
    0,
  );

  const addCartItem = (item: CartItemParams) =>
    setCart((curr) => [...curr, { ...item, quantity: 1 }]);

  const updateCartItem = (item: CartItemParams) =>
    setCart((curr) =>
      curr.map((currItem) =>
        currItem.id === item.id ? { ...currItem, ...item } : currItem,
      ),
    );

  const deleteCartItem = (id: string) =>
    setCart((curr) => curr.filter((item) => item.id !== id));

  const clearCart = () => setCart([]);

  const incCartItemQuantity = (id: string) =>
    setCart((curr) =>
      curr.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );

  const decCartItemQuantity = (id: string) =>
    setCart((curr) => {
      if (cartItemQuantity(id) === 1)
        return curr.filter((item) => item.id !== id);
      return curr.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      );
    });

  return (
    <CartContext.Provider
      value={{
        cart,
        amountCart,
        cartItemQuantity,
        totalPrice,
        addCartItem,
        updateCartItem,
        deleteCartItem,
        clearCart,
        incCartItemQuantity,
        decCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = use(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export { CartProvider, useCart };
