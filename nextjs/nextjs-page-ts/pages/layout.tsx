import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <header>
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-white text-lg font-bold">
              Home
            </Link>
            <div className="space-x-4">
              <Link href="/blog" className="text-white">
                Blog
              </Link>
              <Link href="/products" className="text-white">
                Products
              </Link>
              <Link href="/contact" className="text-white">
                Contact
              </Link>
              <Link href="/login" className="text-white">
                Login
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
