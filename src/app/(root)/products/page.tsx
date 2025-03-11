import { ProductFilter } from "@/components/ProductFilter";
import { ProductsList } from "@/components/ProductsList";
import Image from "next/image";

export default function ProductsPage() {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* CAMPAIGN */}
      <div className="hidden bg-blue-50 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700 text-center">
            Grab up to 50% off on
            <br />
            Selected Products
          </h1>
          <button className="rounded-3xl bg-primary text-white w-max py-3 px-5 text-sm">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image src="/man.png" alt="" fill className="object-contain" />
        </div>
      </div>
      <ProductFilter />
      <ProductsList />
    </div>
  );
}
