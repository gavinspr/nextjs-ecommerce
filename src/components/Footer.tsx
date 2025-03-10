"use client";

import Link from "next/link";
import {
  FaCcDiscover,
  FaCcMastercard,
  FaCcVisa,
  FaFacebookF,
  FaInstagram,
  FaPaypal,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";
import { FaChevronUp, FaXTwitter } from "react-icons/fa6";
import { SiKlarna } from "react-icons/si";

// todo: handle subscribe email
// todo: handle language functionality
// todo: handle currency functionality

export const Footer = () => {
  return (
    <footer className="px-4 py-24 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-blue-100 text-sm mt-24 relative">
      <button
        className="absolute -top-10 md:top-4 left-1/2  -translate-x-1/2 flex flex-col items-center"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <FaChevronUp />
        <span className="font-semibold">Back To Top</span>
      </button>
      <div className="flex flex-col md:flex-row justify-between gap-24">
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <Link href="/">
            <div className="text-2xl tracking-wide">KAIT</div>
          </Link>
          <p>Newport News, Virginia 23602, United States</p>
          <span className="font-semibold">contact@kait.com</span>
          <span className="font-semibold">+1 757-123-4567</span>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram size={18} />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer">
              <FaPinterest size={18} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <FaYoutube size={18} />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer">
              <FaXTwitter size={18} />
            </a>
          </div>
        </div>
        <div className="hidden lg:flex justify-between w-1/2">
          <div className="flex flex-col justify-between">
            <h1 className="font-md text-lg">COMPANY</h1>
            <div className="flex flex-col gap-6">
              <Link href="">About Us</Link>
              <Link href="">Careers</Link>
              <Link href="">Affiliates</Link>
              <Link href="">Blog</Link>
              <Link href="">Contact Us</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="font-md text-lg">SHOP</h1>
            <div className="flex flex-col gap-6">
              <Link href="">Featured Products</Link>
              <Link href="">New Arrivals</Link>
              <Link href="">Deals</Link>
              <Link href="">Accessories</Link>
              <Link href="">All Products</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="font-md text-lg">HELP</h1>
            <div className="flex flex-col gap-6">
              <Link href="">Contact Us</Link>
              <Link href="">My Account</Link>
              <Link href="">Store Locator</Link>
              <Link href="">Legal & Privacy</Link>
              <Link href="">Gift Cards</Link>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <h1 className="font-medium text-lg">SUBSCRIBE</h1>
          <p>
            Want VIP access? Subscribe for secret sales, product drops, and a
            welcome discount.
          </p>
          <div className="flex">
            <input
              type="text"
              placeholder="Email address"
              className="p-4 w-3/4 bg-white "
            />
            <button className="w-1/4 bg-primary text-white ">JOIN</button>
          </div>
          <span className="font-semibold">Secure Payments</span>
          <div className="flex justify-between">
            <FaCcVisa size={18} />
            <FaCcMastercard size={18} />
            <FaCcDiscover size={18} />
            <FaPaypal size={18} />
            <SiKlarna size={18} />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
        <div className="">
          &copy; {new Date().getFullYear()} Kait. All rights reserved.
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="">
            <span className="text-gray-500 mr-4 ">Language</span>
            <span className="font-medium">United States | English</span>
          </div>
          <div className="">
            <span className="text-gray-500 mr-4 ">Currency</span>
            <span className="font-medium">$ USD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
