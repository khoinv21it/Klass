import React from "react";
import { useCart } from "../CartProvider";
import { IoIosAddCircle } from "react-icons/io";

interface IProduct {
  id: number;
  name: string;
  price: number;
}

const data: IProduct[] = [
  { id: 1, name: "iPhone 16 Pro", price: 999 },
  { id: 2, name: "Samsung Galaxy S24", price: 899 },
  { id: 3, name: "MacBook Air M3", price: 1199 },
  { id: 4, name: "AirPods Pro", price: 249 },
];

export const ProductGrid: React.FC = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: IProduct) => {
    addToCart(product);
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-600 mb-8 text-center">
        Danh Sách Sản Phẩm
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-6 border hover:shadow-lg transition-shadow"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-2xl font-bold text-gray-800">
                ${product.price}
              </p>
            </div>

            <button
              onClick={() => handleAddToCart(product)}
              className="w-full bg-linear-to-r from-cyan-500 to-blue-500 text-white py-2 px-4 rounded-md hover:bg-linear-to-t from-sky-500 to-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium"
            >
              Add to Cart <IoIosAddCircle size={24} className="inline-block ml-2" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
