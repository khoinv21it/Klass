import { useCart } from "../CartProvider";
import { ProductGrid } from "../components/ProductGrid";
import { BsCart2 } from "react-icons/bs";
import { useNavigate } from "react-router";

type Props = {};

function ShoppingHeader() {
  const navigate = useNavigate();
  const { getItemCount } = useCart();

  const handleCartClick = () => {
    navigate("cart");
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold text-gray-600">Shopping Cart</h1>

      <button
        onClick={handleCartClick}
        className="relative p-3 bg-linear-to-bl from-violet-500 to-fuchsia-500 text-white rounded-full hover:bg-linear-65 from-purple-500 to-pink-500 transition-colors duration-200 shadow-lg"
      >
        <BsCart2 size={24} />
        {getItemCount() > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
            {getItemCount()}
          </span>
        )}
      </button>
    </div>
  );
}

export default function ShoppingPage({}: Props) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <ShoppingHeader />

        <div className="mb-12">
          <ProductGrid />
        </div>
      </div>
    </div>
  );
}
