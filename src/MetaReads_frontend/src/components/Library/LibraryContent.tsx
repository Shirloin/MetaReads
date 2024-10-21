import React from "react";
import { BookDataProps, BookModel, LibraryModel } from "../Props/model";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import LibraryName from "./LibraryName";
import { Tooltip } from "@mui/material";
import { AiFillClockCircle } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
interface LibraryContentProps {
  selectedLibrary: LibraryModel;
  handleBookSelect: (book: BookModel | null) => void;
  fetchData: () => void;
}

const BookDisplay: React.FC<{ coverImage: string }> = ({ coverImage }) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"
    style={{
      backgroundImage: `url(${coverImage})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>

  </div>
);
const BookDescription: React.FC<{ data: BookModel }> = ({ data }) => {
  return (
    <div>
      <Tooltip title="Total Reading Time" arrow >
        <div className="flex items-center gap-2 font-medium">
          <AiFillClockCircle />
          <div className="ml-1 text-sm">14 hours</div>
        </div>
      </Tooltip>
      <Tooltip title="Author" arrow>
        <div className="flex items-center gap-2 font-medium">
          <BsFillPersonFill className="text-gray-black" />
          <span className="ml-1 text-sm">{data.author.name}</span>
        </div>
      </Tooltip>
    </div>
  );
};

export default function LibraryContent({
  selectedLibrary,
  handleBookSelect,
  fetchData
}: LibraryContentProps
) {
  const onBookSelected = ({ data }: BookDataProps) => {
    handleBookSelect(data)
  }
  return (
    <div className="max-h-[100vh] overflow-y-auto overflow-x-hidden">
      <div className="p-5">
        <LibraryName
          libraryName={selectedLibrary.name}
          id={selectedLibrary.id}
          count={selectedLibrary.bookList.length}
          fetchData={fetchData}
        />
      </div>
      <BentoGrid className="mt-8 max-w-5xl cursor-pointer">
        {selectedLibrary.bookList.map((book: BookModel, i: number) => (
          <BentoGridItem
            onClick={() => onBookSelected({ data: book })}
            key={i}
            title={book.title}
            description={<BookDescription data={book} />}
            header={<BookDisplay coverImage={book.coverImage} />}
          // icon={item.icon}
          // className={i % 4 === 1 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
