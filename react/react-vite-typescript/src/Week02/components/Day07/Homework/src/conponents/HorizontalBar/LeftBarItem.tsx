import { FaRegBell } from "react-icons/fa";

export default function LeftBarItem() {
  return (
    <div className="flex items-center gap-x-10 mr-6">
      <div className="text-xl text-gray-600">
        <FaRegBell />
      </div>
      <span className="flex items-center gap-3">
        <img
          src="https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg"
          alt="Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <p className="text-gray-800 font-medium">Emma Kwan</p>
      </span>
    </div>
  );
}
