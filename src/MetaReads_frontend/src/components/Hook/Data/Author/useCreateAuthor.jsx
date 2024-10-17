import { useState } from "react";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";

export const useCreateAuthor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createAuthor = async (name) => {
    setLoading(true);
    setError(null);

    try {
      await MetaReads_backend.create_author({
        id: [],
        name: name,
      });
      return true; // Indicate success
    } catch (err) {
      setError(err);
      return false; // Indicate failure
    } finally {
      setLoading(false);
    }
  };

  return { createAuthor, loading, error };
};
