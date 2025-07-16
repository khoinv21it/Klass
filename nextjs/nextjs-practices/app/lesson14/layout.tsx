import React from "react";
import Image from "next/image";
import { FaMobileAlt, FaLaptop, FaHeadphones, FaTabletAlt, FaStore, FaDesktop, FaSimCard, FaReceipt, FaRegClock, FaRegUser , FaChevronRight, FaSearch } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
import { BsSmartwatch } from "react-icons/bs";

type Props = {
  children?: React.ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <div className="w-full">
      <header>
        <div className="w-full bg-[#85E3FF] flex justify-center items-center">
          <Image
            src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/bd/26/bd260331dfc577627b0c955e027cdaba.png"
            alt="Logo"
            width={1200}
            height={44}
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        
        <nav className="w-full bg-yellow-400 shadow">
          <div className="w-[1200px] mx-auto">
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-3">
                <Image
                  src="https://cdn.haitrieu.com/wp-content/uploads/2021/11/Logo-The-Gioi-Di-Dong-MWG.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="rounded-full bg-black"
                  priority
                />
                <span className="text-xl font-bold text-black tracking-tight">thegioididong<span className="text-xs font-normal">.com</span></span>
              </div>
              {/* Search box with icon */}
              <div className="relative w-[400px]">
                <input
                  type="text"
                  placeholder="Bạn tìm gì..."
                  className="w-full px-5 py-2 rounded-full bg-white text-gray-700 border-none outline-none shadow focus:ring-2 focus:ring-yellow-500 pr-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaSearch />
                </span>
              </div>
              <div className="flex items-center gap-6">
                <a href="#" className="flex items-center gap-1 text-black p-[8px_10px] rounded-[32px] hover:bg-white/50 font-[18px] text-[14px]">
                  <FaRegUser  />
                  Đăng nhập
                </a>
                <a href="#" className="flex items-center gap-1 text-black p-[8px_10px] rounded-[32px] hover:bg-white/50 font-[18px] text-[14px]">
                  <AiOutlineShoppingCart  />
                  Giỏ hàng
                </a>
                <div className="flex items-between items-center gap-3 bg-white/40 px-8 py-2 rounded-[32px] hover:bg-white/50 font[18px] text-[14px]">
                  <LiaMapMarkerAltSolid  />
                  Hồ Chí Minh
                  <FaChevronRight />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 pt-2 text-black font-[18px] text-[14px]">
              <a href="#" className="flex items-center gap-1 hover:bg-white/50 p-[5px_10px_10px_10px] rounded-t-[8px] whitespace-nowrap"><FaMobileAlt />Điện thoại</a>
              <a href="#" className="flex items-center gap-1 hover:bg-white/50 p-[5px_10px_10px_10px] rounded-t-[8px] whitespace-nowrap"><FaLaptop />Laptop</a>
              <a href="#" className="flex items-center gap-1 hover:bg-white/50 p-[5px_10px_10px_10px] rounded-t-[8px] whitespace-nowrap"><FaHeadphones />Phụ kiện</a>
              <a href="#" className="flex items-center gap-1 hover:bg-white/50 p-[5px_10px_10px_10px] rounded-t-[8px] whitespace-nowrap"><BsSmartwatch  />Smartwatch</a>
              <a href="#" className="flex items-center gap-1 hover:bg-white/50 p-[5px_10px_10px_10px] rounded-t-[8px] whitespace-nowrap"><FaRegClock />Đồng hồ</a>
              <a href="#" className="flex items-center gap-1 hover:bg-white/50 p-[5px_10px_10px_10px] rounded-t-[8px] whitespace-nowrap"><FaTabletAlt />Tablet</a>
              <a href="#" className="flex items-center gap-1 hover:bg-white/50 p-[5px_10px_10px_10px] rounded-t-[8px] whitespace-nowrap"><FaStore />Máy cũ, Thu cũ</a>
              <a href="#" className="flex items-center gap-1 hover:bg-white/50 p-[5px_10px_10px_10px] rounded-t-[8px] whitespace-nowrap"><FaDesktop />Màn hình, Máy in</a>
              <a href="#" className="flex items-center gap-1 hover:bg-white/50 p-[5px_10px_10px_10px] rounded-t-[8px] whitespace-nowrap"><FaSimCard />Sim, Thẻ cào</a>
              <a href="#" className="flex items-center gap-1 hover:bg-white/50 p-[5px_10px_10px_10px] rounded-t-[8px] whitespace-nowrap"><FaReceipt />Dịch vụ tiện ích</a>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-1 w-full max-w-4xl mx-auto py-8 px-4">
        {children}
      </main>
    </div>
  );
}
