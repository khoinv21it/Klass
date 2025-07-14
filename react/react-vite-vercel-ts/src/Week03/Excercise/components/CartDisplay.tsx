import React from "react";
import { useCart } from "../CartProvider";

export const CartDisplay: React.FC = () => {
  const { cartItems, getItemCount } = useCart();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Giỏ Hàng ({getItemCount()} sản phẩm)
          </h2>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">Giỏ hàng trống</p>
            <p className="text-gray-400">Hãy thêm sản phẩm vào giỏ hàng!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-blue-600 font-bold">${item.price}</p>
                </div>
                
              </div>
            ))}
            
          </div>
        )}
      </div>
    </div>
  );
};
