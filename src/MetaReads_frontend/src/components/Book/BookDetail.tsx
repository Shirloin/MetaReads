import { AiFillClockCircle } from "react-icons/ai";
import { BsBookFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { BookModel } from "../Props/model";
import GradientButton from "../Form/Button/ReadButton";
import TopGradientButton from "../Form/Button/TopGradientButton";

interface BookDetailProps {
  book: BookModel;
}

export default function BookDetail({ book }: BookDetailProps) {
  const [dominantColor, setDominantColor] = useState<string>("rgba(0,0,0,0.5)");
  const [showDescription, setShowDescription] = useState<boolean>(false);

  useEffect(() => {
    setShowDescription(false)
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = book.coverImage;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;

      if (ctx) {
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, 1, 1).data;
        const red = imageData[0];
        const green = imageData[1];
        const blue = imageData[2];
        const dominantColor = `rgba(${red}, ${green}, ${blue}, 0.8)`;
        setDominantColor(dominantColor);
      }
    };
  }, [book.coverImage]);

  return (
    <div className="relative text-white">
      <div className="h-[500px]">
        <div
          className="relative h-[500px] flex items-end justify-start"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7) 100%), url(${book.coverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.5) 50%, ${dominantColor} 100%)`,
            }}
          ></div>

          <div className="relative flex items-end justify-start w-full max-w-5xl px-4 pb-4 ml-10">
            <img src={book.coverImage} alt="" className="h-[300px] z-10" />

            <div className="ml-6 z-10 flex flex-col gap-2">
              <h2 className="text-4xl font-bold">{book.title}</h2>
              <div className="font-normal">
                <p className="text-lg mt-2">Author: {book.author.name}</p>
                <p className="text-lg">Genre: {book.genre.name}</p>
                <p className="text-lg">Pages: {book.pages_count}</p>
                <p className="text-lg">Views: {book.views}</p>
                <p className="text-lg flex gap-2 items-center">Total Reading Time: 14 hours</p>
              </div>
              <div className="flex gap-6">
                <GradientButton text={<div className="flex gap-2"><div className="flex items-center"><BsBookFill /> </div>Read</div>} onClick={() => { }} />
                <TopGradientButton text={"More Information"} onClick={() => setShowDescription(!showDescription)} />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`fixed top-0 right-0 h-[500px] w-[400px] bg-slate-600 text-white p-6 transform transition-transform duration-500 ease-in-out
            ${showDescription ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <h3 className="text-2xl font-bold mb-4 underline">Description</h3>
          <p>{book.description}</p>
        </div>

      </div>
      <div>
        Recommended For you
      </div>
    </div>
  );
}
