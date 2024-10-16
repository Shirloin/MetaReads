import { useEffect, useState } from "react";
import BaseTable from "./BaseTable";
import PrimaryButton from "../Form/Button/PrimaryButton";
import CreateGenreModal from "../Modal/Genre/CreateGenreModal";
import CustomPagination from "./CustomPagination";
import SearchBar from "../Form/Input/TextField/SearchBar";
import useGenres from "../Hook/Genre/useGenres";
import DeleteGenreModal from "../Modal/Genre/DeleteGenreModal";
import UpdateGenreModal from "../Modal/Genre/UpdateGenreModal";

export default function GenreTable() {
  const [modalState, setModalState] = useState({
    create: false,
    update: false,
    delete: false,
    selectedRow: undefined,
  });

  const [query, setQuery] = useState("");
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 10,
  });

  const [rows, fetchData] = useGenres();
  const headers = ["Id", "Name", "Option"];

  const toggleModal = (type, row = null) => {
    setModalState((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
      selectedRow: row,
    }));
  };

  // Usage in handlers
  const handleOpenUpdate = (row) => toggleModal("update", row);
  const handleOpenDelete = (row) => toggleModal("delete", row);
  const handleOpenCreate = () => toggleModal("create");
  const handleCloseUpdate = () => toggleModal("update");
  const handleCloseDelete = () => toggleModal("delete");
  const handleCloseCreate = () => toggleModal("create");

  const handleChangePage = (event, newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination({ page: 0, rowsPerPage: parseInt(event.target.value, 10) });
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    setPagination({ page: 0, rowsPerPage: pagination.rowsPerPage });
  }, [query]);

  return (
    <>
      <CreateGenreModal
        open={modalState.create}
        handleClose={handleCloseCreate}
        fetchData={fetchData}
        buttonContent={"Create"}
      />
      <UpdateGenreModal
        open={modalState.update}
        handleClose={handleCloseUpdate}
        fetchData={fetchData}
        buttonContent={"Update"}
        selectedItem={modalState.selectedRow}
      />
      <DeleteGenreModal
        open={modalState.delete}
        handleClose={handleCloseDelete}
        fetchData={fetchData}
        selectedItem={modalState.selectedRow}
      />
      <div className="flex flex-col gap-2 p-4">
        <div className="flex gap-4">
          <div className="flex-grow transition-all duration-300">
            <SearchBar value={query} onChange={handleQueryChange} />
          </div>
          <div className="flex items-center">
            <PrimaryButton onClick={handleOpenCreate} text={"Add Genre"} />
          </div>
        </div>
        <BaseTable
          rows={filteredRows.slice(
            pagination.page * pagination.rowsPerPage,
            pagination.page * pagination.rowsPerPage + pagination.rowsPerPage,
          )}
          headers={headers}
          handleOpenDelete={handleOpenDelete}
          handleOpenUpdate={handleOpenUpdate}
        />
        <CustomPagination
          count={filteredRows.length}
          rowsPerPage={pagination.rowsPerPage}
          page={pagination.page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
}
