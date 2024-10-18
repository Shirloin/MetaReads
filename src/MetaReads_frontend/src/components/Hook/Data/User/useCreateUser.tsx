import { useState } from "react";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createUser = async (username: string) => {
    setLoading(true);
    setError(null);

    try {
      await MetaReads_backend.create_user({
        id: [],
        money: [],
        password: [],
        image: [],
        username: username
      });
      return true; // Indicate success
    } catch (err: any) {
      setError(err);
      return false; // Indicate failure
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error };
};
