/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { getAllProducts } from "../services/product.service";
import { useShoppingCartStore } from "../stores/useShoppingCartStore";

export default function ProductsList() {
    const { addToCart } = useShoppingCartStore();
  const [products, setProducts] = React.useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data ?? response);
        console.log("Products fetched:", response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-200"
            >
              <img
                src={product.images?.[0] || "https://via.placeholder.com/150"}
                alt={product.title}
                className="w-32 h-32 object-cover rounded mb-3 border"
              />
              <h3 className="font-semibold text-lg mb-1 text-center">
                {product.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2 text-center line-clamp-2">
                {product.description}
              </p>
              <p className="font-bold text-blue-600 text-base mb-2">
                ${product.price}
              </p>
              {/* Add to cart button or other actions here if needed */}
                <button
                    onClick={() => addToCart(product, 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                >
                    Thêm vào giỏ hàng
                </button>
            </div>
          ))
        ) : (
          <div className="text-gray-500 col-span-full text-center">
            Không có sản phẩm nào.
          </div>
        )}
      </div>
    </div>
  );
}
