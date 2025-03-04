"use client";
import { LuCircleUserRound } from "react-icons/lu";
import { RiShoppingCart2Line } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CartModal } from "./CartModal";

export const NavIcons = () => {
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const isLoggedIn: boolean = !false; // temp

  const router = useRouter();

  const handleAccount = () => {
    // todo: handle for account state
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    setIsAccountOpen(!isAccountOpen);
  };

  const handleLogout = () => {
    // todo: handle for logout
  };

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <LuCircleUserRound
        className="cursor-pointer"
        size={18}
        onClick={handleAccount}
      />
      {isAccountOpen && (
        <div className="absolute p-4 top-12 left-0 text-sm bg-white shadow-lg rounded-md z-20">
          <Link href={"/account"}>Account</Link>
          <button className="mt-2 cursor-pointer" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
      <FaRegBell className="cursor-pointer" size={18} />
      <div className="relative cursor-pointer">
        <RiShoppingCart2Line
          size={18}
          onClick={() => setIsCartOpen(!isCartOpen)}
        />
        <div
          // todo: handle for cart count
          className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-white flex items-center justify-center rounded-full text-xs"
        >
          1
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
};
