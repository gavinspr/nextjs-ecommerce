"use client";

import Image from "next/image";
import { useState } from "react";

// temp
const tempImages = [
  {
    id: 1,
    url: "/temp-product.png",
  },
  { id: 2, url: "/temp-product.png" },
  { id: 3, url: "/temp-product-2.webp" },
];

export const ProductImages = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  return (
    <div className="">
      <div className="h-[500px] relative">
        <Image
          src={tempImages[selectedImageIndex].url}
          alt=""
          fill
          className="object-cover rounded-lg"
          sizes="50vw"
        />
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {tempImages.map((image, index: number) => (
          <div
            key={image.id}
            className="w-1/4 h-32 relative cursor-pointer"
            onClick={() => setSelectedImageIndex(index)}
          >
            <Image
              src={image.url}
              alt=""
              fill
              className="object-cover rounded-lg"
              sizes="50vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
