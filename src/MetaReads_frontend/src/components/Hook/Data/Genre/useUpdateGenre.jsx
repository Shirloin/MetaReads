import { useState } from "react";
import { Principal } from "@dfinity/principal";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";

export const useUpdateGenre = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateGenre = async (id, name) => {
    const genre_id = Principal.fromText(id.toString());
    setLoading(true);
    setError(null);
    try {
      const res = await MetaReads_backend.update_genre({
        id: [genre_id],
        name: name,
      });
      console.log(res);

      return true;
    } catch (err) {
      setError(err);
      return false; // Indicate failure
    } finally {
      setLoading(false);
    }
  };

  return { updateGenre, loading, error };
};
