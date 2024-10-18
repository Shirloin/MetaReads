import * as React from "react";
import PageLayout from "../components/Layout/PageLayout";
import { Title } from "../components/Utility/TitleUtility";
import LibrarySidebar from "../components/Library/LibrarySidebar";
import { BookModel, library1, library2, LibraryModel } from "../components/Props/model";

export default function LibraryPage() {
  const test1: LibraryModel = library1;
  const test2: LibraryModel = library2;
  const libraryList: LibraryModel[] = [test1, test2, test1, test1, test1];
  const [selectedLibrary, setselectedLibrary] = React.useState("Uncategorized");
  const [selectedBook, setSelectedBook] = React.useState<BookModel | null>(null);

  const handleLibrarySelect = (libraryName: string) => {
    setselectedLibrary(libraryName);
  };
  const handleBookSelect = (book: BookModel | null) => {

    setSelectedBook(book);
  };

  return (
    <PageLayout>
      <div className="flex w-full">
        <LibrarySidebar
          libraryList={libraryList}
          selectedLibrary={selectedLibrary}
          handleLibrarySelect={handleLibrarySelect}
          handleBookSelect={handleBookSelect}
          selectedBook={selectedBook}
        />
        <div className="blurred-background flex w-full flex-col">
          <div>
            <Title text={selectedLibrary} />
            {
              selectedBook && (
                <Title text={selectedBook.title} />
              )
            }
          </div>
        </div>
      </div>
      <script src="../../"></script>
    </PageLayout>
  );
}
