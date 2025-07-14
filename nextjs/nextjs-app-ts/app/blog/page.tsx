import Link from "next/link";
import React from "react";

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl px-10 py-12 flex flex-col items-center w-full max-w-2xl">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4 tracking-tight drop-shadow-lg text-center">
          Blog
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
          Chào mừng bạn đến với trang Blog!
          <br />
          Tại đây bạn sẽ tìm thấy những bài viết mới nhất về công nghệ, lập
          trình, và nhiều chủ đề thú vị khác.
        </p>
        <div className="w-full flex flex-col gap-6">
          {/* Demo blog post cards */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 shadow hover:shadow-lg transition-all">
            <h2 className="text-2xl font-bold text-blue-700 mb-2">
              Lập trình React hiện đại
            </h2>
            <p className="text-gray-700 mb-2">
              Khám phá các kỹ thuật và best practices mới nhất trong phát triển
              ứng dụng React.
            </p>
            <span className="text-sm text-gray-500">14/07/2025</span>
          </div>
          <div className="bg-gradient-to-r from-pink-100 to-blue-100 rounded-xl p-6 shadow hover:shadow-lg transition-all">
            <h2 className="text-2xl font-bold text-pink-700 mb-2">
              Tailwind CSS: Thiết kế UI siêu tốc
            </h2>
            <p className="text-gray-700 mb-2">
              Tìm hiểu cách sử dụng Tailwind CSS để xây dựng giao diện đẹp, hiện
              đại và responsive.
            </p>
            <span className="text-sm text-gray-500">10/07/2025</span>
          </div>
        </div>
      </div>
    </div>
  );
}
