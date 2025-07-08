import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "../types/Product";
import { useParams } from "react-router";

type Props = {};

export default function ProductContainer({}: Props) {
    const [currentPage, setCurrentPage] = useState(1);
  const limit = 4;
  const offset = (currentPage - 1) * limit;

  const [products, setProducts] = useState<Product[]>([]);
  const { id } = useParams();
  console.log("id", id);
  const url =
  id !== "all"
      ? `https://api.escuelajs.co/api/v1/categories/${id}/products?offset=${offset}&limit=${limit}`
      : `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`;

      console.log("id", id);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("data", data);
        setProducts(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchProducts();
  }, [url]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  return (
    <div className="flex flex-col">
    <div className="product-list flex flex-wrap gap-1 justify-around">
      {products.map((product) => (
        <ProductCard key={product.id} data={product} />
      ))}
    </div>
    <div className="pagination flex justify-center gap-2 mt-4">
        <button className="p-3 bg-amber-300" onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <button className="p-3 bg-amber-300" onClick={handleNext} disabled={products.length < limit}>
          Next
        </button>
      </div>
    </div>
    
    
  );
}
