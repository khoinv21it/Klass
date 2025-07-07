import React, { useState } from "react";
import ProductGrid from "./components/ProductGrid";
import CartIcon from "./components/CartIcon";
import CartDropdown from "./components/CartDropdown";
import { CartProvider } from "./context/CartContext";
import { products } from "./data/products";

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleDropdown = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <CartProvider>
      <div style={{ position: "relative" }}>
        <header style={{ display: "flex", justifyContent: "flex-end", padding: "16px" }}>
          <div onClick={() => setIsCartOpen(!isCartOpen)} style={{ cursor: "pointer" }}>
            <CartIcon toggleDropdown={toggleDropdown}/>
          </div>
          {isCartOpen && <CartDropdown />}
        </header>

        <main style={{ padding: "16px" }}>
          <ProductGrid products={products}/>
        </main>
      </div>
    </CartProvider>
  );
};

export default App;
