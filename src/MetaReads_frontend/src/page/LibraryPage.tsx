import * as React from "react";
import PageLayout from "../components/Layout/PageLayout";
import { Title } from "../components/Utility/TitleUtility";
import LibrarySidebar from "../components/Library/LibrarySidebar";
import { BookModel, library1, library2, LibraryModel } from "../components/Props/model";
import LibraryContent from "../components/Library/LibraryContent";
import BookDetail from "../components/Book/BookDetail";

export default function LibraryPage() {
  const test1: LibraryModel = library1;
  const test2: LibraryModel = library2;
  const libraryList: LibraryModel[] = [test1, test2];
  const [selectedLibrary, setselectedLibrary] = React.useState<LibraryModel | null>(null);
  const [selectedBook, setSelectedBook] = React.useState<BookModel | null>(null);

  const handleLibrarySelect = (library: LibraryModel) => {
    setselectedLibrary(library);
  };
  const handleBookSelect = (book: BookModel | null) => {
    setSelectedBook(book);
  };

  return (
    <PageLayout>
      <div className="h-[100vh] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
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
                <>Welcome Page Later</>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
