import { Principal } from "@dfinity/principal";
import { useState } from "react";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";

export const useDeleteAuthor = () => {
  const [error, setError] = useState(null);
  const deleteAuthor = async (id) => {
    setError(null);
    const author_id = Principal.fromText(id.toString());
    try {
      await MetaReads_backend.delete_author(author_id);
      return true;
    } catch (error) {
      setError(err);
    }
  };

  return { deleteAuthor, error };
};
