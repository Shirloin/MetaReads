import { useState } from "react";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";
import { Principal } from "@dfinity/principal";

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createUser = async (internetIdentityId: string, username: string) => {
    setLoading(true);
    setError(null);


    try {
      const user = await MetaReads_backend.create_user({
        id: Principal.fromText(internetIdentityId),
        username: username,
        money: [BigInt(100)],
        password: [],
        image: [],
      });
      console.log(user)
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
