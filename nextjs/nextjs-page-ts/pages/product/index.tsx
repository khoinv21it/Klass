import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products?offset=0&limit=10"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const products: Product[] = await response.json();
        setProducts(products);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading)
    return <div className="text-center py-20 text-xl">Loading...</div>;
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;

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
                <img
                  src={imgSrc}
                  alt={product.title}
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
