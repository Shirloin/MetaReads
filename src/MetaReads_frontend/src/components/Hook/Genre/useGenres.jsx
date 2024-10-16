import { useEffect, useState } from "react";
import { MetaReads_backend } from "../../../../../declarations/MetaReads_backend";

function createData(id, name, option) {
  return { id, name, option };
}

const useGenres = () => {
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    try {
      const genresResponse = await MetaReads_backend.get_all_genre();
      const genreRows = genresResponse.map((genre) =>
        createData(genre.id, genre.name, "Options"),
      );
      setRows(genreRows);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return [rows, fetchData];
};

export default useGenres;
