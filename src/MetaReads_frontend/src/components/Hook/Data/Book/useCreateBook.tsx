import { useState } from "react";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";
import { Principal } from "@dfinity/principal";
import { AuthorModel, GenreModel } from "../../../Props/model";

export const useCreateBook = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  const createBook = async (
    title: string,
    author: AuthorModel,
    book_url: string,
    plan: string,
    genre: GenreModel,
    description: string,
    coverImage: string,
    pages_count: number,
  ) => {
    setLoading(true);
    setError(null);

    try {
      await MetaReads_backend.create_book({
        id: [],
        title: title,
        book_url: book_url,
        cover_image: coverImage,
        description: description,
        plan: plan,
        author_id: author.id,
        genre_id: genre.id,
        page_count: BigInt(pages_count),
      });
      return true; // Indicate success
    } catch (err: any) {
      setError(err);
      return false; // Indicate failure
    } finally {
      setLoading(false);
    }
  };

  return { createBook, loading, error };
};
