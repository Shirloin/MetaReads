import { useEffect, useState } from "react";
import BaseTable from "./BaseTable";
import { MetaReads_backend } from "../../../../declarations/MetaReads_backend";
import { Button } from "@mui/material";
import PrimaryButton from "../Form/Button/PrimaryButton";
import CreateGenreModal from "../Modal/Genre/CreateGenreModal";

export default function GenreTable() {
  const [createItem, setCreateItem] = useState(false);
  const [updateItem, setUpdateItem] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);
  const [selectedRow, setSelectedRow] = useState(undefined);
  const [rows, setRows] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const genresResponse = await MetaReads_backend.get_all_genre();
        // Map the response to match the table structure
        const genreRows = genresResponse.map((genre) =>
          createData(genre.id, genre.name, "Options"),
        );
        setRows(genreRows);
        console.log(genresResponse);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchData();
  }, []);

  //   useEffect(() => {
  //     const seedDummyData = () => {
  //       const dummyRows = [
  //         createData(1, "Fiction", "Options"),
  //         createData(2, "Science Fiction", "Options"),
  //         createData(3, "Fantasy", "Options"),
  //         createData(4, "Romance", "Options"),
  //       ];
  //       console.log(dummyRows);

  //       setRows(dummyRows);
  //     };
  //     seedDummyData();
  //   }, []);

  const headers = ["Id", "Name", "Option"];
  function createData(id, name, option) {
    return { id, name, option };
  }
  const handleUpdateItem = (row) => {
    setSelectedRow(row);
    setUpdateItem(true);
  };
  const handleDeleteItem = (row) => {
    setSelectedRow(row);
    setDeleteItem(true);
  };
  const handleCreateItem = () => {
    setCreateItem(true);
  };
  const handleCloseUpdate = () => {
    setUpdateItem(false);
    setSelectedRow(null);
  };
  const handleCloseDelete = () => {
    setDeleteItem(false);
    setSelectedRow(null);
  };
  const handleCloseCreate = () => {
    setCreateItem(false);
  };
  return (
    <>
      <CreateGenreModal open={createItem} handleClose={handleCloseCreate} />
      <div className="flex flex-col gap-2 p-4">
        <div>
          <PrimaryButton onClick={handleCreateItem} text={"Add Genre"} />
        </div>
        <BaseTable
          rows={rows}
          headers={headers}
          handleDeleteItem={handleDeleteItem}
          handleUpdateItem={handleUpdateItem}
        />
      </div>
    </>
  );
}
