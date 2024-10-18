import { useState } from "react";

export const useModalState = () => {
  const [modalState, setModalState] = useState({
    create: false,
    update: false,
    delete: false,
    selectedRow: undefined,
  });

  const toggleModal = (type, row = null) => {
    setModalState((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
      selectedRow: row,
    }));
  };

  return {
    modalState,
    toggleModal,
    handleOpenCreate: () => toggleModal("create"),
    handleOpenUpdate: (row) => toggleModal("update", row),
    handleOpenDelete: (row) => toggleModal("delete", row),
    handleCloseCreate: () => toggleModal("create"),
    handleCloseUpdate: () => toggleModal("update"),
    handleCloseDelete: () => toggleModal("delete"),
  };
};
