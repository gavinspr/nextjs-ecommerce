"use client";

import { SLIDES } from "../constants/homeSlides";
import { Slide } from "../types/Slide";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const HomeSlider = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      setCurrentSlide((prev: number) =>
        prev === SLIDES.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        {SLIDES.map((slide: Slide) => (
          <div
            className={`${slide.bgColor} w-screen h-full flex flex-col gap-16 xl:flex-row`}
            key={slide.id}
          >
            <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center">
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl">
                {slide.description}
              </h2>
              <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">
                {slide.title}
              </h1>
              <Link href={slide.url}>
                <button className="rounded-md  ring-2 ring-gray-300 hover:bg-black hover:text-white py-3 px-4 cursor-pointer">
                  SHOP NOW
                </button>
              </Link>
            </div>
            <div className="h-1/2 xl:w-1/2 xl:h-full relative">
              <Image
                src={slide.image}
                alt=""
                fill
                sizes="100%"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">
        {SLIDES.map((slide: Slide, index: number) => (
          <div
            className={`w-3 h-3  rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
              currentSlide === index ? "scale-150" : ""
            }`}
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
          >
            {currentSlide === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
