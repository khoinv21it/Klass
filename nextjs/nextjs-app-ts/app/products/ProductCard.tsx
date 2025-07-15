"use client";
import React, { useState } from "react";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

export default function ProductCard({
  id,
  title,
  price,
  description,
  images,
}: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState(images[0] || "/no-image.png");

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition-all">
      <img
        src={imgSrc}
        alt={title}
        className="w-full h-48 object-cover rounded-xl mb-4 border"
        onError={() => setImgSrc("/no-image.png")}
      />
      <h2 className="text-xl font-bold mb-2 text-blue-700 truncate">{title}</h2>
      <p className="text-lg font-semibold text-pink-600 mb-2">${price}</p>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
    </div>
  );
}
