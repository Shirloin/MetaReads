import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../components/Layout/PageLayout";
import BookDetail from "../components/Book/BookDetail";
import { MetaReads_backend } from "../../../declarations/MetaReads_backend";
import { Principal } from "@dfinity/principal";
import { BookModel } from "../components/Props/model";

function BookDetailPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<BookModel | undefined>();

  const fetchData = async () => {
    try {
      const booksResponse: any = await MetaReads_backend.get_book(
        Principal.fromText(bookId as string),
      );

      // // Directly destructure to get books and total_count from booksResponse.Ok
      const book = booksResponse.Ok;
      console.log(book);

      setBook(book);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <PageLayout>{book && <BookDetail book={book} />}</PageLayout>;
}

export default BookDetailPage;
