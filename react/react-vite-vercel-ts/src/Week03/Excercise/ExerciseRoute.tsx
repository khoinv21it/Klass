import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ShoppingPage from "./pages/ShoppingPage";
import { CartProvider } from "./CartProvider";

type Props = {};

export default function ExerciseRoute({}: Props) {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<ShoppingPage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}
