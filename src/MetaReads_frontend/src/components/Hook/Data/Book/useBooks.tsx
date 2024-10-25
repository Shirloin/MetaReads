import { useEffect, useState } from "react";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";
import {
  BaseTableColumnBooksProps,
  BaseTableColumnProps,
} from "../../../Props/tabeProps";
import { GenreModel } from "../../../Props/model";
import { Principal } from "@dfinity/principal";

function createData(data: BaseTableColumnBooksProps) {
  const { id, title, book_url, plan, cover_image, page_count, option } = data;
  return { id, title, book_url, plan, cover_image, page_count, option };
}

const useBooks = () => {
  const [rows, setRows] = useState<BaseTableColumnBooksProps[]>([]);
  const fetchData = async () => {
    try {
      const booksResponse: any = await MetaReads_backend.get_all_book({
        page: BigInt(0),
        limit: BigInt(100),
        query: "",
      });

      const bookRows: BaseTableColumnBooksProps[] = booksResponse.Ok.books.map(
        (book: any) =>
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

      console.log(booksResponse);

      setRows(bookRows);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return [rows, fetchData] as const;
};

export default useBooks;
