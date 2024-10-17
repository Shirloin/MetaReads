import { useEffect, useState } from "react";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";

function createData(id, name, option) {
  return { id, name, option };
}

const useAuthors = () => {
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    try {
      const authorResponse = await MetaReads_backend.get_all_author();
      const authorRows = authorResponse.map((author) =>
        createData(author.id, author.name, "Options"),
      );
      setRows(authorRows);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return [rows, fetchData];
};

export default useAuthors;
