import { useState } from "react";
import { MetaReads_backend } from "../../../../../declarations/MetaReads_backend";

export const useCreateGenre = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createGenre = async (name) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await MetaReads_backend.create_genre({
        id: [], // Assuming id is handled in the backend
        name: name,
      });
      setSuccess(true);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { createGenre, loading, error, success };
};
