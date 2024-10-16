import { Principal } from "@dfinity/principal";
import { MetaReads_backend } from "../../../../../declarations/MetaReads_backend";
import { useState } from "react";

export const useDeleteGenre = () => {
  const [error, setError] = useState(null);
  const deleteGenre = async (id) => {
    setError(null);
    const genre_id = Principal.fromText(id.toString());
    try {
      await MetaReads_backend.delete_genre(genre_id);
      return true;
    } catch (error) {
      setError(err);
    }
  };

  return { deleteGenre, error };
};
