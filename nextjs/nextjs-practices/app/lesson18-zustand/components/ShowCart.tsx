"use client";
import { FaOpencart } from "react-icons/fa";
import Image from "next/image";
import { useShoppingCartStore } from "../stores/useShoppingCartStore";
import { RemoveFromCartButton, ClearCartButton } from "./CartActionButtons";

export default function ShowCart() {
  const { cartItems, getTotalPrice, getCartItemsCount } =
    useShoppingCartStore();
  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <div className="flex items-center">
        <FaOpencart size={40} />{" "}
        <div className="text-red-500 text-2xl font-bold">
          {getCartItemsCount()}
        </div>
      </div>
      {cartItems.length > 0 ? (
        <div>
          <ul className="space-y-4">
            {cartItems.map(
              (item: import("../stores/useShoppingCartStore").ICartItem) => (
                <li
                  key={item.product.id}
                  className="flex justify-between items-center bg-white rounded-lg shadow p-4 border hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={
                        item.product.images?.[0] ||
                        "https://via.placeholder.com/60"
                      }
                      alt={item.product.title}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded border"
                    />
                    <div>
                      <div className="font-semibold text-base text-gray-800">
                        {item.product.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        Số lượng:{" "}
                        <span className="font-bold">{item.quantity}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-blue-600 text-lg">
                      ${item.product.price * item.quantity}
                    </span>
                    <RemoveFromCartButton productId={item.product.id} />
                  </div>
                </li>
              )
            )}
          </ul>
          <div className="mt-6 text-right">
            <span className="text-lg font-bold text-gray-700">Tổng tiền: </span>
            <span className="text-xl font-bold text-blue-700">
              ${getTotalPrice()}
            </span>
          </div>
          <ClearCartButton />
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8 text-lg">
          Giỏ hàng trống
        </div>
      )}
    </div>
  );
}
