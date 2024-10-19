import { useState } from "react";
import { Principal } from "@dfinity/principal";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";

export const useUpdateAuthor = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  const updateAuthor = async (id: Principal, name: string) => {
    const author_id: Principal = Principal.fromText(id.toString());
    setLoading(true);
    setError(null);
    try {
      const res = await MetaReads_backend.update_author({
        id: [author_id],
        name: name,
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

  return { updateAuthor, loading, error };
};