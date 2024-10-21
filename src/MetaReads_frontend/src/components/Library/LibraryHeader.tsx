import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { Principal } from "@dfinity/principal";
import MetaReadsLogo from "../../../public/assets/Meta Reads Logo.png";
import LibraryForm from "../Form/Layout/LibraryForm";
import { useModalState } from "../Hook/Ui/useModalState";
import DeleteLibraryModal from "../Modal/Library/DeleteLibraryModal";
import { BookModel, LibraryModel } from "../Props/model";
import UpdateLibraryModal from "../Modal/Library/UpdateLibraryModal";

interface LibraryNameProps {
  selectedItem: LibraryModel;
  count: number;
  fetchData: () => void
  handleLibrarySelect: (library: LibraryModel | null) => void;
}

export default function LibraryHeader({
  selectedItem,
  count,
  fetchData,
  handleLibrarySelect
}: LibraryNameProps) {
  const {
    modalState,
    handleOpenUpdate,
    handleOpenDelete,
    handleCloseUpdate,
    handleCloseDelete,
  } = useModalState();

  const afterDeleteAndUpdate = () => {
    handleLibrarySelect(null);
    fetchData()
  }
  return (
    <div>
      <UpdateLibraryModal open={modalState.update} handleClose={handleCloseUpdate} fetchData={afterDeleteAndUpdate} selectedItem={selectedItem} />

      <DeleteLibraryModal
        open={modalState.delete}
        handleClose={handleCloseDelete}
        fetchData={afterDeleteAndUpdate}
        selectedItem={selectedItem}
      />
      <div className="flex w-full gap-2 border-b-2 border-gray-400 pb-1">
        <div className="flex w-full gap-2">
          <div className="flex items-center text-xl text-white">
            {selectedItem.name}
          </div>
          <div className="flex items-center text-xl text-gray-400">
            ({count})
          </div>
          <div className="ml-4 flex h-auto cursor-pointer items-center justify-center gap-2">
            <MdModeEditOutline
              color="white"
              size={22}
              onClick={handleOpenUpdate}
            />

            <div className="flex items-center justify-center">
              <div
                style={{
                  borderLeft: "2px solid #DDE6ED",
                  height: "22px",
                  margin: "0 10px",
                }}
              />
            </div>

            <MdDelete color="red" size={24} onClick={handleOpenDelete} />
          </div>
        </div>
        <div className="flex items-center">
          <img src={MetaReadsLogo} alt="Full Logo" width={36} />
        </div>
      </div>
    </div>
  );
}