import { useEffect, useState } from "react";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";
import {
  BaseTableColumnBooksProps,
  BaseTableColumnProps,
} from "../../../Props/tabeProps";
import { BookModel, BookModelProps, GenreModel } from "../../../Props/model";
import { Principal } from "@dfinity/principal";

function createData(data: BaseTableColumnBooksProps) {
  const { id, title, book_url, plan, cover_image, page_count, option } = data;
  return { id, title, book_url, plan, cover_image, page_count, option };
}

const useBooks = () => {
  const [rows, setRows] = useState<BookModel[]>([]);

  const fetchData = async () => {
    try {
      const booksResponse: any = await MetaReads_backend.get_all_book({
        query: "",
      });

      console.log(booksResponse);

      // Directly destructure to get books and total_count from booksResponse.Ok
      const { books } = booksResponse.Ok;

      const bookRows: BookModel[] = books.map((book: any) =>
        createData({
          id: Principal.fromText(book.id.toString()),
          title: book.title,
          book_url: book.book_url,
          plan: book.plan,
          page_count: book.page_count,
          cover_image: book.cover_image,
          option: "Options",
        }),
      );

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

export default useBooks;
