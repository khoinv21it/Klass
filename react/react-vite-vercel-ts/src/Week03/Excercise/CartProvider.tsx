import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface IProduct {
  id: number;
  name: string;
  price: number;
}

interface ICartContext {
  cartItems: IProduct[];
  addToCart: (product: IProduct) => void;
  getItemCount: () => number;
}

export const CartContext = createContext<ICartContext | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<IProduct[]>([]);

  const addToCart = (product: IProduct) => {
    setCartItems((prev) => [...prev, product]);
  };

//   const getTotalPrice = () => {
//     return cartItems.reduce((total, item) => total + item.price, 0);
//   };

  const getItemCount = () => {
    return cartItems.length;
  };

  const value: ICartContext = {
    cartItems,
    addToCart,
    getItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): ICartContext => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
