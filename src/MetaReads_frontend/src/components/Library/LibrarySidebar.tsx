import React, { useState, useEffect, useRef } from "react";
import LibraryAccordion from "./LibraryAccordion";
import { BookModel, LibraryModel } from "../Props/model";

interface LibrarySidebarProps {
  selectedLibrary: string;
  handleLibrarySelect: (library: string) => void;
  libraryList: LibraryModel[];
  handleBookSelect: (book: BookModel) => void;
  selectedBook: BookModel | null;
}

const LibrarySidebar: React.FC<LibrarySidebarProps> = ({
  selectedLibrary,
  handleLibrarySelect,
  libraryList,
  handleBookSelect,
  selectedBook
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState("30%");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

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
        style={{ backgroundColor: "#202429" }}
      >
        {libraryList.map((library, index) => (
          <LibraryAccordion
            key={index}
            libraryName={library.name}
            bookList={library.bookList}
            count={library.bookList.length}
            selectedLibrary={selectedLibrary}
            onLibrarySelect={handleLibrarySelect}
            handleBookSelect={handleBookSelect}
            selectedBook={selectedBook}
            sidebarRef={sidebarRef}
          />
        ))}
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
