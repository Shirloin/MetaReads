import ReadButton from "../Form/Button/ReadButton";
import { BookModel } from "../Props/model";

interface BookDetailProps {
  book: BookModel;
}

export default function BookDetail({ book }: BookDetailProps) {
  return (
    <>
      <div
        className="relative h-[300px] bg-red-500"
        style={{
          backgroundImage: `url(${book.coverImage})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-700"></div>
      </div>
      <h2 className="mt-2 text-xl font-bold">{book.title}</h2>
      <ReadButton text="Read" color="#202429" onClick={() => {}} />
    </>
  );
}
