"use client";

import { MdOutlineLogout } from "react-icons/md";
import Cookies from "js-cookie";

export default function LogoutButton() {
  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("access_token");
    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white shadow hover:from-red-600 hover:to-red-700 transition-all"
    >
      Logout <MdOutlineLogout className="inline-block ml-1" />
    </button>
  );
}
