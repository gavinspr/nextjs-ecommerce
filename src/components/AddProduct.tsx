"use client";

import { ChangeEvent, useState } from "react";

export const AddProduct = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const stock: number = 6; // todo: get stock from the server

  const handleQuantity = (type: "increment" | "decrement") => {
    if (type === "increment") {
      quantity < stock && setQuantity((prev) => prev + 1);
    } else {
      quantity > 1 && setQuantity((prev) => prev - 1);
    }
  };

  const handleInputChange = (value: number) => {
    if (!isNaN(value)) {
      const clamped = Math.min(stock, Math.max(1, value));
      setQuantity(clamped);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-200 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl"
              onClick={() => handleQuantity("decrement")}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(parseInt(e.target.value))
              }
              className="w-12 text-center bg-transparent border-none focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              min={1}
              max={stock}
            />
            <button
              className="cursor-pointer text-xl"
              onClick={() => handleQuantity("increment")}
            >
              +
            </button>
          </div>
          <div className="text-xs">
            Only <span className="text-primary">{stock} items</span> left!
          </div>
        </div>
        <button className="w-36 text-sm rounded-3xl ring-1 ring-primary text-primary py-2 px-4 hover:bg-primary cursor-pointer hover:text-white disabled:cursor-not-allowed disabled:bg-blue-200 disabled:text-white disabled:ring-none">
          Add to Cart
        </button>
      </div>
    </div>
  );
};
