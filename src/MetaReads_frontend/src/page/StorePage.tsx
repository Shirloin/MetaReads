import PageLayout from "../components/Layout/PageLayout";
import TopNavbar from "../components/Navbar/TopNavbar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css"; // Ensure the styles are imported
import BookCard from "../components/Book/BookCard";
import OutlinedButton from "../components/Form/Button/OutlinedButton";
import { books, dummyBook, recommendedBooks } from "../components/Props/model";
import { FocusCards } from "../components/ui/focus-cards";

export default function StorePage() {
  const cards = [
    {
      title: "Forest Adventure",
      src: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
    },
    {
      title: "Valley of life",
      src: "https://images.unsplash.com/photo-1600271772470-bd22a42787b3?q=80&w=3072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Sala behta hi jayega",
      src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Camping is for pros",
      src: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "The road not taken",
      src: "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "The First Rule",
      src: "https://assets.aceternity.com/the-first-rule.png",
    },
  ];

  return (
    <PageLayout>
      <div className="relative max-h-[100vh] w-full overflow-y-auto bg-white bg-dot-black/[0.2] dark:bg-black dark:bg-dot-white/[0.2]">
        <TopNavbar />
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
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
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
          <FocusCards books={recommendedBooks} />
        </div>

        <div className="flex w-full flex-col gap-8 px-16">
          <div className="flex gap-6 text-white">
            {/* Test */}
            <OutlinedButton
              text={"Popular"}
              color={"white"}
              outlineColor={"#EFAF21"}
              onClick={() => {}}
            />
            <OutlinedButton
              text={"Recent Release"}
              color={"white"}
              onClick={() => {}}
            />
            <OutlinedButton
              text={"Special Offer"}
              color={"white"}
              onClick={() => {}}
            />
          </div>
          <FocusCards books={books} />
          {/* <div className="grid grid-cols-4 gap-y-8">
          <BookCard data={dummyBook} />
          <BookCard data={dummyBook} />
          <BookCard data={dummyBook} />
          <BookCard data={dummyBook} />
          <BookCard data={dummyBook} />
          <BookCard data={dummyBook} />
          <BookCard data={dummyBook} />
          <BookCard data={dummyBook} />
          <BookCard data={dummyBook} />
        </div> */}
        </div>
      </div>
    </PageLayout>
  );
}
