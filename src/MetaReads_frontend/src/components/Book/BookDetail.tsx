import React, { useEffect, useState } from "react";
import ReadButton from "../Form/Button/ReadButton";
import { BookModel } from "../Props/model";

interface BookDetailProps {
  book: BookModel;
}

export default function BookDetail({ book }: BookDetailProps) {
  const [dominantColor, setDominantColor] = useState<string>("rgba(0,0,0,0.5)");

  // Convert Blob to a URL for the image
  // const blobURL = URL.createObjectURL(imageBlob);
  // setImageURL(blobURL);

  // // Create a canvas to extract the dominant color from the Blob image
  // const img = new Image();
  // img.src = blobURL;
  useEffect(() => {

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
    <>
      <div
        className="relative h-[300px] "
        style={{
          backgroundImage: `url(${book.coverImage})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom right, transparent, ${dominantColor})`,
          }}
        ></div>
      </div>
      <h2 className="mt-2 text-xl font-bold">{book.title}</h2>
      <ReadButton text="Read" color="#202429" onClick={() => { }} />
    </>
  );
}
