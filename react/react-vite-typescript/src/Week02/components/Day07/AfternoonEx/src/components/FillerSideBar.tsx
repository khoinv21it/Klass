import React, { useEffect } from "react";
import { NavLink } from "react-router";
const URL = "https://api.escuelajs.co/api/v1/categories";

interface Category {
  id: number;
  name: string;
  slug?: string;
  image?: string;
}

type Props = {};

export default function FillerSideBar({}: Props) {
  const [categories, setCategories] = React.useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setCategories(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchCategories();
  }, []);
  return (
    <div className="flex flex-col items-center w-[20%] bg-amber-200">
      <span className="font-semibold text-lg">Bộ lọc</span>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <NavLink
              to={`/product/category/${category.id}`}
              style={({ isActive }) =>
                isActive ? { fontWeight: "bold" } : undefined
              }
            >
              {category.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
