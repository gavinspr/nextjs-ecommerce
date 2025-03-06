import Image from "next/image";
import Link from "next/link";

// todo: replace items with actual data

export const ProductsList = () => {
  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      <Link
        href="/products/1"
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
      >
        <div className="cursor-pointer relative w-full h-80">
          <Image
            src="/temp-product.png"
            alt="product1"
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 transition-opacity easy duration-500 hover:opacity-0"
          />
          <Image
            src="/temp-product-2.webp"
            alt="product1"
            fill
            sizes="25vw"
            className=" absolute object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <span className="font-md">Product Name</span>
          <span className="font-semibold">$100</span>
        </div>
        <div className="text-gray-500 text-sm">Product description</div>
        <div className="rounded-2xl ring-1 ring-primary py-2 px-4 text-xs w-max hover:bg-primary hover:text-white">
          Add to Cart
        </div>
      </Link>
      <Link
        href="/products/1"
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
      >
        <div className="cursor-pointer relative w-full h-80">
          <Image
            src="/temp-product.png"
            alt="product1"
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 transition-opacity easy duration-500 hover:opacity-0"
          />
          <Image
            src="/temp-product-2.webp"
            alt="product1"
            fill
            sizes="25vw"
            className=" absolute object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <span className="font-md">Product Name</span>
          <span className="font-semibold">$100</span>
        </div>
        <div className="text-gray-500 text-sm">Product description</div>
        <div className="rounded-2xl ring-1 ring-primary py-2 px-4 text-xs w-max hover:bg-primary hover:text-white">
          Add to Cart
        </div>
      </Link>
      <Link
        href="/products/1"
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
      >
        <div className="cursor-pointer relative w-full h-80">
          <Image
            src="/temp-product.png"
            alt="product1"
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 transition-opacity easy duration-500 hover:opacity-0"
          />
          <Image
            src="/temp-product-2.webp"
            alt="product1"
            fill
            sizes="25vw"
            className=" absolute object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <span className="font-md">Product Name</span>
          <span className="font-semibold">$100</span>
        </div>
        <div className="text-gray-500 text-sm">Product description</div>
        <div className="rounded-2xl ring-1 ring-primary py-2 px-4 text-xs w-max hover:bg-primary hover:text-white">
          Add to Cart
        </div>
      </Link>
      <Link
        href="/products/1"
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
      >
        <div className="cursor-pointer relative w-full h-80">
          <Image
            src="/temp-product.png"
            alt="product1"
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 transition-opacity easy duration-500 hover:opacity-0"
          />
          <Image
            src="/temp-product-2.webp"
            alt="product1"
            fill
            sizes="25vw"
            className=" absolute object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <span className="font-md">Product Name</span>
          <span className="font-semibold">$100</span>
        </div>
        <div className="text-gray-500 text-sm">Product description</div>
        <div className="rounded-2xl ring-1 ring-primary py-2 px-4 text-xs w-max hover:bg-primary hover:text-white">
          Add to Cart
        </div>
      </Link>
    </div>
  );
};
