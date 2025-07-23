/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

export default async function ProductsList() {
  // SSR fetch
  const res = await fetch("https://api.escuelajs.co/api/v1/products");
  const products = await res.json();

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product: any) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-200"
            >
              <Image
                src={product.images?.[0] || "https://via.placeholder.com/150"}
                alt={product.title}
                width={128}
                height={128}
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
              <AddToCartButton product={product} />
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
