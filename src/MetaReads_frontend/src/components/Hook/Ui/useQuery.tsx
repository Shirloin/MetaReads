import { useState } from "react";

export const useQuery = (rows: { name: string }[]) => {
  const [query, setQuery] = useState<string>("");

  const handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const filteredRows = rows.filter((row) => {
    return row.name.toLowerCase().includes(query.toLowerCase());
  });

  return {
    query,
    setQuery,
    handleQueryChange,
    filteredRows,
  };
};
