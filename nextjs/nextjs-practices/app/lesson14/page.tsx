import React from "react";
import Image from "next/image";

type Product = {
  id: number;
  title: string;

  price: number;
  images: string[];
};

export const dynamic = "force-static";

export const revalidate = 60;

export default async function Home() {
  const products = await fetch(
    "https://api.escuelajs.co/api/v1/products?offset=0&limit=10",
    {
      next: {
        revalidate: 60,
      },
    }
  ).then((res) => res.json());
  return <ProductList products={products} />;
}

function ProductList({ products }: { products: Product[] }) {
  if (!products.length) return <div>No products found.</div>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border p-4 rounded-lg shadow hover:shadow-lg transition"
        >
          <Image
            src={product.images[0]}
            alt={product.title}
            width={200}
            height={200}
            className="w-full h-auto object-cover mb-2"
          />
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="text-xl font-bold mt-2">${product.price}</p>
          <a
            href={`/lesson14/product-detail/${product.id}`}
            className="block mt-3 text-center bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition"
          >
            Xem chi tiết
          </a>
        </div>
      ))}
    </div>
  );
}
