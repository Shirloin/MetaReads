import PageLayout from "../components/Layout/PageLayout";
import TopNavbar from "../components/Navbar/TopNavbar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css"; // Ensure the styles are imported
import BookCard from "../components/Book/BookCard";
import OutlinedButton from "../components/Form/Button/OutlinedButton";
import { BookModel, BookModelProps } from "../components/Props/model";
import { FocusCards } from "../components/ui/focus-cards";
import StoreContent from "../components/Store/StoreContent";
import { useEffect, useState } from "react";
import BookDetail from "../components/Book/BookDetail";
import useBooks from "../components/Hook/Data/Book/useBooks";
import { Principal } from "@dfinity/candid/lib/cjs/idl";
import useStoreBooks from "../components/Hook/Data/Book/useStoreBooks";

export default function StorePage() {
  const [selectedBook, setSelectedBook] = useState<BookModel | null>(null);

  useEffect(() => {}, [selectedBook]);
  const [rows, fetchData] = useStoreBooks();

  const handleBookSelect = (book: BookModel | null) => {
    setSelectedBook(book);
  };

  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    fetchData(search);
  }, [search]);

  return (
    <PageLayout>
      <div className="relative min-h-[100vh] w-full overflow-y-auto bg-white bg-dot-black/[0.2] dark:bg-black dark:bg-dot-white/[0.2]">
        <TopNavbar search={search} setSearch={setSearch} />
        {/* {selectedBook != null && <BookDetail book={selectedBook} />} */}
        {search != "" ? (
          <>
            <FocusCards books={rows} />
          </>
        ) : (
          selectedBook == null && (
            <StoreContent handleBookSelect={handleBookSelect} />
          )
        )}
      </div>
    </PageLayout>
  );
}
