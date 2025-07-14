import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa6"; // Cần cài react-icons nếu chưa có

type Props = {};

export default function VercelDirect({}: Props) {
  return (
    <div className="flex gap-6 justify-center py-10">
      <Link to="/lesson09/afternoon/form01">
        <button className="group relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-700 to-amber-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-200">
          Lesson09
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 group-hover:bg-white/40 transition-all duration-200">
            <FaArrowRight className="text-white group-hover:translate-x-1 transition-transform duration-200" />
          </span>
        </button>
      </Link>
      <Link to="/lesson10">
        <button className="group relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-200">
          Lesson10
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 group-hover:bg-white/40 transition-all duration-200">
            <FaArrowRight className="text-white group-hover:translate-x-1 transition-transform duration-200" />
          </span>
        </button>
      </Link>

      <Link to="/exam">
        <button className="group relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-700 to-pink-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-200">
          Exam
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 group-hover:bg-white/40 transition-all duration-200">
            <FaArrowRight className="text-white group-hover:translate-x-1 transition-transform duration-200" />
          </span>
        </button>
      </Link>
    </div>
  );
}
