import BookCardImageFocused from "../Book/BookCardImageFocused";
import { BookModel, LibraryModel } from "../Props/model";
import LibraryName from "./LibraryName";

interface LibraryContentProps {
  selectedLibrary: LibraryModel;
  handleBookSelect: (book: BookModel | null) => void;
}

export default function LibraryContent({
  selectedLibrary,
  handleBookSelect,
}: LibraryContentProps) {
  return (
    <div className="max-h-[100vh] overflow-y-auto overflow-x-hidden">
      <LibraryName
        libraryName={selectedLibrary.name}
        id={selectedLibrary.id}
        count={selectedLibrary.bookList.length}
      />
      <div
        className="mt-8 grid gap-5"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}
      >
        {selectedLibrary.bookList.map((book) => (
          <div>
            <BookCardImageFocused
              data={book}
              handleBookSelect={handleBookSelect}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
