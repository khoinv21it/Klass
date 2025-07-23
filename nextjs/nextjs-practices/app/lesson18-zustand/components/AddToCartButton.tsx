"use client";
import React from "react";
import { useShoppingCartStore, IProduct } from "../stores/useShoppingCartStore";

interface AddToCartButtonProps {
  product: IProduct;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addToCart = useShoppingCartStore((state) => state.addToCart);
  return (
    <button
      onClick={() => addToCart(product, 1)}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
    >
      Thêm vào giỏ hàng
    </button>
  );
}
