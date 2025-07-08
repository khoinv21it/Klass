import React from "react";
import { NavLink } from "react-router";
import LogoNavBar from "./LogoNavBar";

const ItemNavBar = [
  { label: "Patients", path: "/" },
  { label: "Overview", path: "/overview" },
  { label: "Map", path: "/map" },
  { label: "Departments", path: "/departments" },
  { label: "Doctors", path: "/doctors" },
  { label: "History", path: "/history" },
  { label: "Settings", path: "/settings" },
];

type Props = {};

export default function NavBar({}: Props) {
  return (
    <div className="w-64 bg-zinc-100 text-gray-800 min-h-screen p-6 border-r border-gray-200 shadow-sm">
      <LogoNavBar />
      <hr className="text-gray-400"/>
      <h2 className="text-2xl font-bold mb-8 tracking-tight text-gray-700">
        Dashboard
      </h2>
      <ul className="space-y-2">
        {ItemNavBar.map((item) => (
          <li key={item.path} className="mb-2">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `text-lg font-medium ${
                  isActive ? "text-blue-600 block px-4 transition-all duration-100 ease-in-out bg-blue-200 rounded" : "text-gray-600 opacity-80 hover:opacity-100 block px-4 transition-all duration-100 ease-in-out hover:bg-gray-200 rounded"
                }`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
