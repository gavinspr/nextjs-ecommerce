import Link from "next/link";
import { Menu } from "./Menu";
import Image from "next/image";
import { SearchBar } from "./SearchBar";
import { NavIcons } from "./NavIcons";

export const Navbar = () => {
  return (
    <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* mobile */}
      <div className=" md:hidden flex items-center justify-between h-full">
        <Link href="/">
          <div className="text-2xl tracking-wide">KAIT</div>
        </Link>
        <Menu />
      </div>
      {/* larger screen */}
      <div className="hidden md:flex items-center justify-between gap-8 h-full">
        <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="logo" width={24} height={24} />
            <div className="text-2xl tracking-wide">KAIT</div>
          </Link>
          <div className="hidden xl:flex items-center gap-4">
            <Link href="/">Home</Link>
            <Link href="/products">Shop</Link>
            <Link href="/deals">Deals</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  );
};
