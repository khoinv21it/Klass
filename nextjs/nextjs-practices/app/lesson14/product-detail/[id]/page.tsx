import React from "react";
import Image from "next/image";

export const dynamic = "force-static";
export const revalidate = 60;
export const dynamicParams = true; // Chỉ định rằng trang này sẽ không sử dụng các tham số động

export async function generateStaticParams() {
  const res = await fetch(
    "https://api.escuelajs.co/api/v1/products?offset=0&limit=10",
    {
      next: {
        revalidate: 60,
      },
    }
  );
  const products = await res.json();
  if (!products || !Array.isArray(products)) {
    return [];
  }

  return products.slice(0, 3).map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductDetail({ params }: { params: Promise<{ id: number }> }) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${(await params).id}`, {
    next: {
      revalidate: 60,
    },
  });
  const product = await res.json();

  if (!product) {
    return <div>Product not found</div>;
  }

  const mainImage = product.images?.[0];
  const otherImages = product.images?.slice(1) || [];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      {mainImage && (
        <div className="w-full flex justify-center mb-4">
          <img src={mainImage} alt={product.title} className="w-full max-w-lg h-auto rounded-lg shadow object-contain" />
        </div>
      )}
      {otherImages.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          {otherImages.map((img: string, idx: number) => (
            <Image key={idx} src={img} alt={product.title + ' ' + idx} className="w-full h-24 object-cover rounded border" />
          ))}
        </div>
      )}
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-xl font-bold text-blue-600 mb-2">${product.price}</p>
    </div>
  );
}
