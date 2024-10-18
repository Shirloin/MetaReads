import BookCardImageFocused from "../Book/BookCardImageFocused";
import { LibraryModel } from "../Props/model";
import LibraryName from "./LibraryName";

interface LibraryContentProps {
    selectedLibrary: LibraryModel;
}

export default function LibraryContent({ selectedLibrary }: LibraryContentProps) {
    return (
        <div className="overflow-y-auto max-h-[100vh]">
            <LibraryName
                libraryName={selectedLibrary.name}
                id={selectedLibrary.id}
                count={selectedLibrary.bookList.length}
            />
            <div
                className="grid gap-5 mt-8"
                style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                }}
            >
                {selectedLibrary.bookList.map((book) => (
                    <div >
                        <BookCardImageFocused data={book} />
                    </div>
                ))}
            </div>
        </div>
    );
}
