import { CartDisplay } from "../components/CartDisplay";
import BuyerForm from "./BuyerForm";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

type Props = {};

export default function CartPage({}: Props) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/test");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={handleBackClick}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 gap-2"
          >
            <FaArrowCircleLeft size={28} className="mr-2" />
            <span className="text-2xl font-medium">Quay lại</span>
          </button>
        </div>
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Giỏ Hàng & Thông Tin Mua Hàng
        </h1>

        <div className="space-y-8">
          <CartDisplay />
          <BuyerForm />
        </div>
      </div>
    </div>
  );
}
