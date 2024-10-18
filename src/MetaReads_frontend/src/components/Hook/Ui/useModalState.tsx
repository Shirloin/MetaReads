import { useState } from "react";

interface ModalState {
  create: boolean;
  update: boolean;
  delete: boolean;
  selectedRow?: any;
}

export const useModalState = () => {
  const [modalState, setModalState] = useState<ModalState>({
    create: false,
    update: false,
    delete: false,
    selectedRow: undefined,
  });

  const toggleModal = (type: keyof ModalState, row: any = null) => {
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
    handleOpenUpdate: (row: any) => toggleModal("update", row),
    handleOpenDelete: (row: any) => toggleModal("delete", row),
    handleCloseCreate: () => toggleModal("create"),
    handleCloseUpdate: () => toggleModal("update"),
    handleCloseDelete: () => toggleModal("delete"),
  };
};
