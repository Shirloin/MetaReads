import { useState } from "react";

export const useQuery = (rows: { name: string }[]) => {
  const [query, setQuery] = useState<string>("");

  const handleQueryChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
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

export const useQueryBook = (
  rows: {
    title: string;
    book_url: string;
    plan: string;
    cover_image: string;
    page_count: number;
  }[],
) => {
  const [query, setQuery] = useState<string>("");

  const handleQueryChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setQuery(e.target.value);
  };

  return {
    query,
    setQuery,
    handleQueryChange,
  };
};
