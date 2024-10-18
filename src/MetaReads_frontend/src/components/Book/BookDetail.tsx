import { BookModel } from "../Props/model";

interface BookDetailProps {
    book: BookModel;
}
export default function BookDetail({ book }: BookDetailProps) {
    return (
        <>
            {
                book.title
            }
        </>
    )
}