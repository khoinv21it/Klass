"use client";
import React from "react";
import { useShoppingCartStore } from "../stores/useShoppingCartStore";

interface RemoveButtonProps {
  productId: number;
}

export function RemoveFromCartButton({ productId }: RemoveButtonProps) {
  const removeFromCart = useShoppingCartStore((state) => state.removeFromCart);
  return (
    <button
      onClick={() => removeFromCart(productId)}
      className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 shadow transition-colors duration-200"
    >
      Xóa
    </button>
  );
}

export function ClearCartButton() {
  const clearCart = useShoppingCartStore((state) => state.clearCart);
  return (
    <button
      onClick={clearCart}
      className="mt-6 w-full px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold shadow hover:from-red-600 hover:to-red-700 transition-colors duration-200"
    >
      Xóa giỏ hàng
    </button>
  );
}
