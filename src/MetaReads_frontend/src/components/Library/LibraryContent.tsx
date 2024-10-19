// import BookCardImageFocused from "../Book/BookCardImageFocused";
// import { BookModel, LibraryModel } from "../Props/model";
// import LibraryName from "./LibraryName";

interface LibraryContentProps {
  selectedLibrary: LibraryModel;
  handleBookSelect: (book: BookModel | null) => void;
}

import { BookModel } from "../Props/model";
// export default function LibraryContent({
//   selectedLibrary,
//   handleBookSelect,
// }: LibraryContentProps) {
//   return (
//     <div className="max-h-[100vh] overflow-y-auto overflow-x-hidden">
//       <LibraryName
//         libraryName={selectedLibrary.name}
//         id={selectedLibrary.id}
//         count={selectedLibrary.bookList.length}
//       />
//       <div
//         className="mt-8 grid gap-5"
//         style={{
//           gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//         }}
//       >
//         {selectedLibrary.bookList.map((book) => (
//           <div>
//             <BookCardImageFocused
//               data={book}
//               handleBookSelect={handleBookSelect}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import LibraryName from "./LibraryName";

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
export default function LibraryContent({
  selectedLibrary,
  handleBookSelect,
}: LibraryContentProps
) {
  return (
    <div className="max-h-[100vh] overflow-y-auto overflow-x-hidden" >
      <div className="p-5">
        <LibraryName
          libraryName={selectedLibrary.name}
          id={selectedLibrary.id}
          count={selectedLibrary.bookList.length}
        />
      </div>
      <BentoGrid className="max-w-5xl  mt-8  ">
        {selectedLibrary.bookList.map((book: BookModel, i: number) => (
          <BentoGridItem
            key={i}
            title={book.title}
            description={book.description}
            header={<BookDisplay coverImage={book.coverImage} />}
            // icon={item.icon}
            className={i % 4 === 1 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
