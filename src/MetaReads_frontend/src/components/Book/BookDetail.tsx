import { AiFillClockCircle } from "react-icons/ai";
import { BsBookFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { BookModel } from "../Props/model";
import GradientButton from "../Form/Button/GradientButton";
import TopGradientButton from "../Form/Button/TopGradientButton";
import { Link } from "react-router-dom";
import { useCheckUserAuthorization } from "../Hook/Data/User/useCheckUserAuthorization";
import { useCookie } from "../Hook/Cookie/useCookie";
import { useUser } from "../../lib/user_provider";
import SubscriptionWarningModal from "../Modal/Warning/SubscriptionWarningModal";
import { Title } from "../Utility/TitleUtility";
import ShimmerButton from "../Form/Button/ShimmerButton";
import CardComment from "../ui/card-comment";
interface BookDetailProps {
  book: BookModel;
}

export default function BookDetail({ book }: BookDetailProps) {
  const [dominantColor, setDominantColor] = useState<string>("rgba(0,0,0,0.5)");
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const { getCookie } = useCookie();
  const { user } = useUser();
  const { isLoggedIn } = useCheckUserAuthorization({
    user,
    getCookie,
    detailBook: book,
  });

  useEffect(() => {
    setShowDescription(false);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = book.cover_image;

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
  }, [book.cover_image]);

  return (
    <div className="relative text-white">
      <div className="h-[500px]">
        <div
          className="relative flex h-[500px] items-end justify-start"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7) 100%), url(${book.cover_image})`,
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

          <div className="relative ml-10 flex w-full max-w-5xl items-end justify-start px-4 pb-4">
            <img src={book.cover_image} alt="" className="z-10 h-[300px]" />

            <div className="z-10 ml-6 flex flex-col gap-2">
              <h2 className="text-4xl font-bold">{book.title}</h2>
              <div className="font-normal">
                <p className="mt-2 text-lg">Author: {book.author.name}</p>
                <p className="text-lg">Genre: {book.genre.name}</p>
                <p className="text-lg">Pages: {Number(book.pages_count)}</p>
                <p className="text-lg">Views: {Number(book.views)}</p>
                <p className="flex items-center gap-2 text-lg">
                  Total Reading Time: 14 hours
                </p>
              </div>
              <div className="flex gap-6">
                <Link to={`/read/${book.id}`}>
                  <GradientButton
                    text={
                      <div className="flex gap-2">
                        <div className="flex items-center">
                          <BsBookFill />{" "}
                        </div>
                        Read
                      </div>
                    }
                    onClick={() => { }}
                  />
                </Link>

                <TopGradientButton
                  text={"More Information"}
                  onClick={() => setShowDescription(!showDescription)}
                />
                {isLoggedIn == true && (
                  <>
                    <button className="duration-400 transform rounded-lg border border-black bg-black px-6 py-2 font-bold text-black shadow-[0_0_0_3px_#000000_inset] transition hover:-translate-y-1 dark:border-[#EFAF21] dark:text-white">
                      Add To Library
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`fixed right-0 top-0 h-[500px] w-[400px] transform bg-slate-600 p-6 text-white transition-transform duration-500 ease-in-out ${showDescription ? "translate-x-0" : "translate-x-full"}`}
        >
          <h3 className="mb-4 text-2xl font-bold underline">Description</h3>
          <p>{book.description}</p>
        </div>
      </div>
      <div className="pb-4 text-2xl font-bold">Comment</div>
      <div className="w-full">
        {!isLoggedIn ? (
          <div className="flex w-full justify-center py-4">
            <ShimmerButton text={"Login"} onClick={() => {}} />
          </div>
        ) : (
          <></>
        )}
        <CardComment />
        <CardComment />
        <CardComment />
        <CardComment />
      </div>
    </div>
  );
}
