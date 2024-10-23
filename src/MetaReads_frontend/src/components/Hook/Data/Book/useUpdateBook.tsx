import { useState } from "react";
import { Principal } from "@dfinity/principal";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";
import { AuthorModel, GenreModel } from "../../../Props/model";

export const useUpdateBook = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  interface BookModel {
    id: Principal;
    title: string;
    author: AuthorModel;
    book_url: string;
    plan: string;
    genre: GenreModel;
    description: string;
    coverImage: string;
    views: number;
    pages_count: number;
  }

  const updateBook = async ({
    id,
    title,
    author,
    book_url,
    plan,
    genre,
    description,
    coverImage,
    views,
    pages_count,
  }: BookModel) => {
    const book_id: Principal = Principal.fromText(id.toString());
    setLoading(true);
    setError(null);
    try {
      const res = await MetaReads_backend.update_book({
        id: [book_id],
        title: title,
        book_url: book_url,
        cover_image: coverImage,
        description: description,
        plan: plan,
        author_id: author.id,
        genre_id: genre.id,
        page_count: BigInt(pages_count),
      });
      console.log(res);

      return true;
    } catch (err: any) {
      setError(err);
      return false; // Indicate failure
    } finally {
      setLoading(false);
    }
  };

  return { updateBook, loading, error };
};
