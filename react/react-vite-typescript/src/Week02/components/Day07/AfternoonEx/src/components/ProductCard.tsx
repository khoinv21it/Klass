import React from "react";
import type { Product } from "../types/Product";

type Props = {
  data: Product;
};

export default function ProductCard({ data }: Props) {
  return (
    <div className="flex-wrap w-[200px] p-3 bg-blue-400">
      <div className="w-full">
        <img src={data.images[0]} alt="" />
      </div>
      <div>
        <p>{data.title}</p>
        <p>{data.price}</p>
      </div>
    </div>
  );
}
