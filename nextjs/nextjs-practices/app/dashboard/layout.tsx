import React from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import Button from "./components/LogoutButton";
import LogoutButton from "./components/LogoutButton";

type Props = {
  children?: React.ReactNode;
};

// const NavItem = ({
//   href,
//   children,
// }: {
//   href: string;
//   children: React.ReactNode;
// }) => (
//   <li>
//     <Link
//       href={href}
//       className="px-3 py-2 rounded hover:bg-blue-100 transition"
//     >
//       {children}
//     </Link>
//   </li>
// );

export default function layout({ children }: Props) {
  return (
    <div>
      <div>
        <header className="mb-8 border-b bg-white shadow-sm">
          <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold text-blue-700">
              Task Management
            </h1>
            {/* <ul className="flex gap-2 bg-gray-100 rounded-lg px-2 py-1">
              <NavItem href="/lesson12/task-csr">Task-CSR-Lesson12</NavItem>
            </ul> */}
            <LogoutButton />
          </nav>
        </header>
        <div className="max-w-5xl mx-auto px-4">{children}</div>
      </div>
    </div>
  );
}
