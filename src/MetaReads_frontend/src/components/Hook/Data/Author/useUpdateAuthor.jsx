import { useState } from "react";
import { Principal } from "@dfinity/principal";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";

export const useUpdateAuthor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateAuthor = async (id, name) => {
    const author_id = Principal.fromText(id.toString());
    setLoading(true);
    setError(null);
    try {
      const res = await MetaReads_backend.update_author({
        id: [author_id],
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

  return { updateAuthor, loading, error };
};
