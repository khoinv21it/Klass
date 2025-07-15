import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4">
      <div className="relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="60"
              cy="60"
              r="58"
              stroke="#6366F1"
              strokeWidth="4"
              fill="#fff"
            />
            <text
              x="50%"
              y="54%"
              textAnchor="middle"
              fill="#6366F1"
              fontSize="48"
              fontWeight="bold"
              dy=".3em"
            >
              404
            </text>
          </svg>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl px-10 py-12 flex flex-col items-center mt-16">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4 tracking-tight drop-shadow-lg">
            Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
            Oops! The page you are looking for does not exist or has been moved.
            <br />
            Please check the URL or return to the homepage.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-pink-500 text-white font-semibold text-lg shadow-lg hover:from-blue-700 hover:to-pink-600 transition-all duration-200"
          >
            ⬅️ Return Home
          </Link>
        </div>
      </div>
      <div className="mt-12 text-gray-400 text-sm text-center">
        <span className="inline-block animate-bounce">🚀</span> Powered by
        Next.js
      </div>
    </div>
  );
}
