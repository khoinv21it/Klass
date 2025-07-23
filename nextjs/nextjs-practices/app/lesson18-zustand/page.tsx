import ProductsList from "./components/ProductsList";
import ShowCart from "./components/ShowCart";

export default function Lesson18() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-8">
          <div>
            <ShowCart />
          </div>
          <div>
            <ProductsList />
          </div>
        </div>
      </div>
    </div>
  );
}
