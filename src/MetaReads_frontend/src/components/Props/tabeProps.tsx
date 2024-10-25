import { Principal } from "@dfinity/principal";

export interface BaseTableColumnProps {
  id: Principal;
  name: string;
  option: string;
}

export interface BaseTableColumnBooksProps {
  id: Principal;
  title: string;
  book_url: string;
  plan: string;
  cover_image: string;
  pages_count: number;
  option: string;
}
