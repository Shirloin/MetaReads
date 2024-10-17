import { useState, useEffect } from "react";

export const useCustomPagination = (defaultRowsPerPage = 10) => {
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: defaultRowsPerPage,
  });

  const handleChangePage = (event, newPage) => {
    setPagination((prevState) => ({ ...prevState, page: newPage }));
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination({
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10),
    });
  };

  return {
    pagination,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};
