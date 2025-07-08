import React from "react";
import DefautLayout from "./src/layouts/DefautLayout";
import { Route, Routes } from "react-router";
import HomePage from "./src/pages/HomePage";
import ProductPage from "./src/pages/ProductPage";
import ProductContainer from "./src/components/ProductContainer";
import BlogPage from "./src/pages/BlogPage";

type Props = {};

export default function AfternoonEx({}: Props) {
  return (
    // <div>
    //   <DefautLayout />
    // </div>
    <Routes>
      <Route path="/" element={<DefautLayout />}>
        <Route index element={<HomePage />} />
        <Route path="product" element={<ProductPage />}>
          <Route path="category/:id" element={<ProductContainer />} />
          {/* phân trang */}
          
        </Route>
        <Route path="blog" element={<BlogPage/>} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
    </Routes>
  );
}
