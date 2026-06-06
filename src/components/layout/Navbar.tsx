"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import CartDrawer from "@/components/cart/CartDrawer";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-gray-200 bg-white font-sans">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Brand */}
          <Link
            href="/"
            className="font-sans text-lg sm:text-xl font-bold tracking-wide text-black whitespace-nowrap"
          >
            AUR<span className="text-green-500">UM</span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden items-center gap-6 sm:gap-8 md:gap-10 md:flex">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`relative text-xs sm:text-sm font-medium tracking-wide transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-green-500 after:transition-all after:duration-300 ${
                    pathname === href
                      ? "text-black after:w-full"
                      : "text-gray-600 hover:text-black after:w-0 hover:after:w-full"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-gray-600 transition-colors hover:text-black"
              aria-label="Open cart"
            >
              <ShoppingBag size={20} strokeWidth={1.5} className="sm:w-[22px] sm:h-[22px]" />
              {cartCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button
              className="p-2 text-gray-600 transition-colors hover:text-black md:hidden"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t border-gray-200 bg-white px-4 sm:px-6 py-5 md:hidden">
            <ul className="flex flex-col gap-4 sm:gap-5">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-sm sm:text-base font-medium tracking-wide transition-colors font-sans ${
                      pathname === href ? "text-black" : "text-gray-600 hover:text-black"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}