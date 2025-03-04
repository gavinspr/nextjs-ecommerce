"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";

export const Menu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <FiMenu
        aria-label="menu icon"
        className="cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        size={28}
      />
      {isOpen && (
        <div className="absolute bg-black text-white flex flex-col gap-6 left-0 top-20 w-full h-[calc(100vh-80px)] items-center justify-center text-xl z-10">
          <Link href="/">Home</Link>
          <Link href="/products">Shop</Link>
          <Link href="/deals">Deals</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link
            // todo: add conditional rendering for cart items based on cart state
            href="/cart"
          >
            Cart
          </Link>
          <Link
            // todo: add conditional rendering for account based on user state
            href="/account"
          >
            Account
          </Link>
          <Link
            href="/login"
            // todo: add conditional rendering for login/logout based on user state
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};
