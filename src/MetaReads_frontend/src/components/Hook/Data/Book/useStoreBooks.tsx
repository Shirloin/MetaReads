import { useEffect, useState } from "react";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";
import {
  BaseTableColumnBooksProps,
  BaseTableColumnProps,
} from "../../../Props/tabeProps";
import { BookModel, BookModelProps, GenreModel } from "../../../Props/model";
import { Principal } from "@dfinity/principal";
const useStoreBooks = () => {
  const [rows, setRows] = useState<BookModel[]>([]);

  const fetchData = async () => {
    try {
      const booksResponse: any = await MetaReads_backend.get_all_book({
        query: "",
      });

      console.log(booksResponse);

      // Directly destructure to get books and total_count from booksResponse.Ok
      const { books } = booksResponse.Ok;

      const bookRows: BookModel[] = books.map((book: any) => {
        return {
          id: Principal.fromText(book.id.toString()),
          title: book.title,
          author: book.author,
          plan: book.plan,
          genre: book.genre,
          description: book.description,
          cover_image: book.cover_image,
          views: book.views,
          pages_count: book.pages_count,
          book_url: book.book_url,
        };
      });

      setRows(bookRows);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [rows, fetchData] as const;
};

export default useStoreBooks;