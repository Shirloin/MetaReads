import React from "react";
import { FaBookmark } from "react-icons/fa";

export default function BookCard() {
  return (
    <div className="group relative z-10 h-[350px] w-[203px] overflow-hidden rounded-md bg-white">
      <img
        className="h-full w-full object-cover transition-transform duration-300"
        src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198"
        alt=""
      />
      <div className="absolute bottom-0 z-30 flex w-full translate-y-40 flex-col justify-between bg-black/60 px-2 py-4 text-white transition-all duration-150 ease-in group-hover:h-full group-hover:translate-y-0">
        <div className="flex w-full flex-col gap-2">
          <div className="font-bold">A VERY VERY LONG TITLE</div>
          <div className="text-sm">
            <p>Author: Vasang</p>
            <p>6.969.69</p>
          </div>
          <div className="transform text-sm opacity-0 transition-transform group-hover:block group-hover:opacity-100">
            <p>Genre: Testing</p>
          </div>
          <div className="transform text-sm opacity-0 transition-transform group-hover:block group-hover:opacity-100">
            <p>Summary</p>
            <p className="line-clamp-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              quisquam cupiditate velit officiis molestias hic
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <div className="flex h-6 items-center justify-center bg-neutral-700 p-1">
              <FaBookmark />
            </div>
            <div className="h-6 rounded-md bg-[#EFAF21] px-3">Subscribe</div>
          </div>
        </div>
      </div>
    </div>
  );
}