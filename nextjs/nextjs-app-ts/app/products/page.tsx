import React from "react";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    "https://api.escuelajs.co/api/v1/products?offset=0&limit=10",
    {
      next: { revalidate: 180 }, // ISR cache <number>s
    }
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            const imgSrc =
              product.images && product.images.length > 0 && product.images[0]
                ? product.images[0]
                : "/no-image.png";
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition-all"
              >
                <Image
                  src={imgSrc}
                  alt={product.title}
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover rounded-xl mb-4 border"
                />
                <h2 className="text-xl font-bold mb-2 text-blue-700 truncate">
                  {product.title}
                </h2>
                <p className="text-lg font-semibold text-pink-600 mb-2">
                  ${product.price}
                </p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {product.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
