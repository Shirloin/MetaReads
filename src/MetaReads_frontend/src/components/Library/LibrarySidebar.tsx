import React, { useState, useEffect, useRef } from "react";
import LibraryAccordion from "./LibraryAccordion";
import { BookModel, LibraryModel } from "../Props/model";
import SearchBar from "../Form/Input/TextField/SearchBar";
import TopGradientButton from "../Form/Button/TopGradientButton";

interface LibrarySidebarProps {
  selectedLibrary: LibraryModel | null;
  handleLibrarySelect: (library: LibraryModel) => void;
  libraryList: LibraryModel[] | null;
  handleBookSelect: (book: BookModel | null) => void;
  selectedBook: BookModel | null;
}

const LibrarySidebar: React.FC<LibrarySidebarProps> = ({
  selectedLibrary,
  handleLibrarySelect,
  libraryList,
  handleBookSelect,
  selectedBook,
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState("30%");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing && sidebarRef.current) {
        const parentWidth =
          sidebarRef.current.parentElement!.getBoundingClientRect().width;
        const newWidth =
          ((e.clientX - sidebarRef.current.getBoundingClientRect().left) /
            parentWidth) *
          100;

        if (newWidth >= 15 && newWidth <= 50) {
          setSidebarWidth(`${newWidth}%`);
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div
      className="resizable-sidebar relative"
      ref={sidebarRef}
      style={{ width: `${sidebarWidth}` }}
    >
      <div
        className="max-h-[100vh] min-h-[100vh] overflow-y-auto"
        style={{ backgroundColor: "rgba(32, 36, 41, 0.3)" }}
      >
        <div
          className="sticky top-0 z-10"
          style={{ backgroundColor: "rgba(32, 36, 41, 1)" }}
        >
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
        </div>
        {libraryList &&
          libraryList.map((library, index) => {
            const filteredBooks = library.bookList.filter((book) =>
              book.title.toLowerCase().includes(searchQuery.toLowerCase()),
            );

            return (
              <LibraryAccordion
                key={index}
                library={library}
                bookList={filteredBooks}
                count={filteredBooks.length}
                selectedLibrary={selectedLibrary}
                onLibrarySelect={handleLibrarySelect}
                handleBookSelect={handleBookSelect}
                selectedBook={selectedBook}
                sidebarRef={sidebarRef}
              />
            );
          })}
      </div>
      <div
        className="resizable-handle"
        ref={handleRef}
        style={{ height: `100vh` }}
        onMouseDown={() => setIsResizing(true)}
      />
    </div>
  );
};

export default LibrarySidebar;
