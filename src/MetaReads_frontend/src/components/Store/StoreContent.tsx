import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css"; // Ensure the styles are imported
import OutlinedButton from "../Form/Button/OutlinedButton";
import { BookModel, BookModelProps } from "../Props/model";
import { FocusCards } from "../ui/focus-cards";
import useBooks from "../Hook/Data/Book/useBooks";
import { useEffect, useState } from "react";
import useStoreBooks from "../Hook/Data/Book/useStoreBooks";
import usePopularBooks from "../Hook/Data/Book/usePopularBooks";
import useLatestBooks from "../Hook/Data/Book/useLatestBooks";
import useRecommendBooks from "../Hook/Data/Book/useRecommendBook";

interface StoreContentProps {
  handleBookSelect: (book: BookModel | null) => void;
}

export default function StoreContent({ handleBookSelect }: StoreContentProps) {
  const [rows, fetchData] = useStoreBooks();
  const [recommend, fetchRecommendData] = useRecommendBooks();
  const [recommendSlice, setRecommendSlice] = useState<BookModel[]>();
  const [popular, fetchPopularData] = usePopularBooks();
  const [latest, fetchLatestData] = useLatestBooks();
  const [recommendedBooks, setRecommendedBooks] = useState<BookModel[]>();
  const [selectBook, setSelectBook] = useState<string>("All Book");

  useEffect(() => {
    const firstFiveRows = recommend.slice(0, 6);
    setRecommendSlice(firstFiveRows);
  }, [recommend]);

  return (
    <>
      <div className="w-full px-16">
        <div className="my-6 w-full overflow-hidden rounded-lg text-white">
          <Swiper
            pagination={true}
            loop={true} // Enable loop
            autoplay={{
              delay: 4000, // 4 seconds delay
              disableOnInteraction: false, // Continue autoplay even after user interaction
            }}
            speed={2000}
            modules={[Pagination, Autoplay]} // Include Autoplay module
            className="w-full"
            slidesPerView={1}
            // onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide className="w-full">
              <img
                className="aspect-[4/1] w-full object-cover"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmCtbXTlczk8XPY6YzMJQaN0Q3En9LMORUsg&s"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide className="w-full">
              <img
                className="aspect-[4/1] w-full object-cover"
                src="https://t3.ftcdn.net/jpg/03/21/97/42/360_F_321974259_BnmlxfkknMol8HiQ0dg1bwQizor48uB9.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide className="w-full">
              <img
                className="aspect-[4/1] w-full object-cover"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLzl3KUOFtEPdAUkK2HPukocZu9lbYk_YYcA&s"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide className="w-full">
              <img
                className="aspect-[4/1] w-full object-cover"
                src="https://as1.ftcdn.net/v2/jpg/04/27/15/08/1000_F_427150821_oQOZiOLP6lnWQdUmUG0YgQiTUsjmaGwE.jpg"
                alt=""
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="my-6 flex w-full flex-col gap-4 px-16 text-white">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">Recommended For You</p>
        </div>
        {recommendSlice && <FocusCards books={recommendSlice} />}
      </div>

      <div className="flex w-full flex-col gap-8 px-16">
        <div className="flex gap-6 text-white">
          {/* Test */}
          <OutlinedButton
            text={"All Book"}
            color={"white"}
            outlineColor={selectBook === "All Book" ? "#EFAF21" : "gray"}
            onClick={() => setSelectBook("All Book")}
          />
          <OutlinedButton
            text={"Popular"}
            color={"white"}
            outlineColor={selectBook === "Popular" ? "#EFAF21" : "gray"}
            onClick={() => setSelectBook("Popular")}
          />
          <OutlinedButton
            text={"Latest"}
            color={"white"}
            outlineColor={selectBook === "Latest" ? "#EFAF21" : "gray"}
            onClick={() => setSelectBook("Latest")}
          />
        </div>
        {rows &&
          (selectBook === "All Book" ? (
            <FocusCards books={rows} handleBookSelect={handleBookSelect} />
          ) : selectBook === "Popular" ? (
            <FocusCards books={popular!} handleBookSelect={handleBookSelect} />
          ) : (
            <FocusCards books={latest!} handleBookSelect={handleBookSelect} />
          ))}
      </div>
    </>
  );
}
