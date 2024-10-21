import * as React from "react";
import PageLayout from "../components/Layout/PageLayout";
import { Title } from "../components/Utility/TitleUtility";
import LibrarySidebar from "../components/Library/LibrarySidebar";
import { BookModel, library1, library2, LibraryModel } from "../components/Props/model";
import LibraryContent from "../components/Library/LibraryContent";
import BookDetail from "../components/Book/BookDetail";
import LibraryDashboard from "../components/Library/LibraryDashboard";
import { useCollapsed } from "../lib/collapsed_provider";

export default function LibraryPage() {
  const { setCollapsed } = useCollapsed()
  React.useEffect(() => {
    setCollapsed(true)
  }, [])

  const test1: LibraryModel = library1;
  const test2: LibraryModel = library2;
  const libraryList: LibraryModel[] = [
    test1,
    test2,
    test1,
    test2,
    test1,
    test2,
    test2,
    test1,
    test2,
    test2,
    test1,
    test2,
    test2,
    test1,
    test2,
    test2,
    test1,
    test2,
    test2,
    test1,
    test2,
    test2,
    test1,
    test2,
    test2,
    test1,
    test2,
    test2,
    test1,
    test2,
    test2,
    test1,
    test2,
  ];
  const [selectedLibrary, setselectedLibrary] =
    React.useState<LibraryModel | null>(null);
  const [selectedBook, setSelectedBook] = React.useState<BookModel | null>(
    null,
  );

  const handleLibrarySelect = (library: LibraryModel | null) => {
    setselectedLibrary(library);
  };
  const handleBookSelect = (book: BookModel | null) => {
    setSelectedBook(book);
  };

  return (
    <PageLayout>
      <div className="relative flex h-[100vh] w-full items-center justify-center bg-white bg-dot-black/[0.2] dark:bg-black dark:bg-dot-white/[0.2]">
        <div className="flex w-full">
          <LibrarySidebar
            libraryList={libraryList}
            selectedLibrary={selectedLibrary}
            handleLibrarySelect={handleLibrarySelect}
            handleBookSelect={handleBookSelect}
            selectedBook={selectedBook}
          />
          <div className="flex w-full flex-col">
            <div>
              {selectedBook != null && <BookDetail book={selectedBook} />}
              {selectedBook == null && selectedLibrary != null && (
                <div className="">
                  <LibraryContent
                    selectedLibrary={selectedLibrary}
                    handleBookSelect={handleBookSelect}
                  ></LibraryContent>
                </div>
              )}
              {selectedBook == null && selectedLibrary == null && (
                <LibraryDashboard
                  libraryList={libraryList}
                  handleLibrarySelect={handleLibrarySelect}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
