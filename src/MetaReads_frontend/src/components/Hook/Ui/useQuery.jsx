import { useState } from "react";

export const useQuery = (rows) => {
  const [query, setQuery] = useState("");

  const handleQueryChange = (e) => {
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
