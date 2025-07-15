"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

type Props = {
  children?: React.ReactNode;
};

function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <li>
      <Link
        href={href}
        className={
          `px-4 py-2 rounded-md font-medium transition-colors duration-200 ` +
          (isActive
            ? "bg-blue-600 text-white shadow-md scale-105"
            : "text-gray-700 hover:bg-blue-100 hover:text-blue-700")
        }
        aria-current={isActive ? "page" : undefined}
      >
        {children}
      </Link>
    </li>
  );
}

export default function layout({ children }: Props) {
  return (
    <div>
      <header className="mb-8 border-b bg-white shadow-sm">
        <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-blue-700">
            Lesson 12 - Afternoon
          </h1>
          <ul className="flex gap-2 bg-gray-100 rounded-lg px-2 py-1">
            <NavItem href="/lesson12/task-ssr">Task-SSR</NavItem>
            <NavItem href="/lesson12/task-csr">Task-CSR</NavItem>
            <NavItem href="/lesson12/task-ssg">Task-SSG</NavItem>
          </ul>
        </nav>
      </header>
      <div className="max-w-5xl mx-auto px-4">{children}</div>
    </div>
  );
}
