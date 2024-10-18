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

interface LibraryNameProps {
  libraryName: string;
  id: Principal;
  count: number;
}

export default function LibraryName({
  libraryName,
  id,
  count,
}: LibraryNameProps) {
  const {
    modalState,
    handleOpenUpdate,
    handleOpenDelete,
    handleCloseUpdate,
    handleCloseDelete,
  } = useModalState();

  const onSubmit = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>,
    name: string | undefined,
  ) => {
    if ("key" in e && e.key !== "Enter") return;
    // Connect to back end
    handleCloseUpdate();
  };

  return (
    <div>
      <DeleteLibraryModal
        open={modalState.delete}
        handleClose={handleCloseDelete}
        fetchData={() => {}}
        selectedItem={id}
      />
      <div className="flex w-full gap-2 border-b-2 border-gray-400 pb-1">
        <div className="flex w-full gap-2">
          {modalState.update ? (
            <LibraryForm onSubmit={onSubmit} id={id} name={libraryName} />
          ) : (
            <div className="flex items-center text-xl text-white">
              {libraryName}
            </div>
          )}
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
