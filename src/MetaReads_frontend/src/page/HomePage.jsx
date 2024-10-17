import PageLayout from "../components/Layout/PageLayout";
import TopNavbar from "../components/Navbar/TopNavbar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

import BookCard from "../components/Card/BookCard";
import OutlinedButton from "../components/Form/Button/OutlinedButton";

export default function HomePage() {
  return (
    <PageLayout>
      <TopNavbar />
      <div className="w-full px-16">
        <div className="my-6 w-full overflow-hidden rounded-lg text-white">
          <Swiper
            pagination={true}
            navigation={true}
            modules={[Pagination]}
            className="w-full"
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
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
          <div className="hidden justify-end gap-3 text-white md:flex">
            <button className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-50 hover:bg-neutral-500">
              {"<"}
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-50 hover:bg-neutral-500">
              {">"}
            </button>
          </div>
        </div>
        <Swiper
          className="w-full"
          slidesPerView={4}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <div>
            <SwiperSlide className="w-fit">
              <BookCard />
            </SwiperSlide>
            <SwiperSlide className="w-fit">
              <BookCard />
            </SwiperSlide>
            <SwiperSlide className="w-fit">
              <BookCard />
            </SwiperSlide>
            <SwiperSlide className="w-fit">
              <BookCard />
            </SwiperSlide>
            <SwiperSlide className="w-fit">
              <BookCard />
            </SwiperSlide>
          </div>
        </Swiper>
      </div>

      <div className="flex w-full flex-col gap-8 px-16">
        <div className="flex gap-6 text-white">
          {/* Test */}
          <OutlinedButton
            text={"Popular"}
            color={"white"}
            outlineColor={"#EFAF21"}
          />
          <OutlinedButton text={"Recent Release"} color={"white"} />
          <OutlinedButton text={"Special Offer"} color={"white"} />
        </div>
        <div className="grid grid-cols-4 gap-y-8">
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
        </div>
      </div>
    </PageLayout>
  );
}
