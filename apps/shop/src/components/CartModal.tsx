"use client";

import Image from "next/image";

export const CartModal = () => {
  const cartItems = true; // temp

  // todo: handle for actual cart items

  return (
    <div className="w-max absolute p-4 rounded-md shadow-md bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {cartItems ? (
        <>
          <h2 className="text-xl">Shopping cart</h2>
          <div className="flex flex-col gap-8">
            <div className="flex gap-4">
              <Image
                src="/temp-product.png"
                alt=""
                width={96}
                height={96}
                className="object-cover rounded-md"
              />
              <div className="flex flex-col justify-between w-full gap-6">
                <div>
                  {/* title */}
                  <div className="flex justify-between items-center gap-8">
                    <h3 className="font-semibold">Nike Dunk</h3>
                    <span className="p-1 bg-gray-50">$79</span>
                  </div>
                  {/* desc */}
                  <div className="text-sm text-gray-500 ">
                    placeholder description
                  </div>
                </div>
                {/* bottom */}
                <div className="flex justify-between text-sm">
                  <span
                    // todo: handle qty
                    // todo: handle for increment/decrement qty
                    className="text-gray-500"
                  >
                    Qty: 1
                  </span>
                  <button className="text-blue-500 cursor-pointer">Remove</button>
                </div>
              </div>
            </div>
            {/* bottom */}
            <div>
              <div className="flex justify-between items-center font-semibold">
                <span>Subtotal</span>
                <span>$79</span>
              </div>
              <p className="text-gray-500 text-sm mt-2 mb-4">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="flex justify-between text-sm">
                <button className="rounded-md py-3 px-4 ring-1 ring-gray-300 cursor-pointer">
                  View Cart
                </button>
                <button className="rounded-md py-3 px-4 bg-black text-white cursor-pointer">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>Cart is empty</div>
      )}
    </div>
  );
};
