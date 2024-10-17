import { useRef } from "react";
import { ToastError } from "../../Form/Notifications/ErrorNotification";
import { ToastSuccess } from "../../Form/Notifications/SuccessNotification";
import { ToastLoading } from "../../Form/Notifications/LoadingNotification";
import { toast } from "react-toastify";
import GenreForm from "../../Form/Layout/GenreForm";
import BaseModal from "../BaseModal";
import { useUpdateGenre } from "../../Hook/Data/Genre/useUpdateGenre";

export default function UpdateGenreModal({
  open,
  handleClose,
  fetchData,
  selectedItem,
}) {
  const { updateGenre, error } = useUpdateGenre();
  const loadingToastId = useRef(null);

  const handleUpdate = async (name) => {
    loadingToastId.current = ToastLoading("Loading..");
    try {
      const success = await updateGenre(selectedItem.id, name);
      if (success) {
        ToastSuccess("Genre Created Successfully");
        fetchData();
      } else {
        ToastError(error);
      }
    } finally {
      if (loadingToastId.current) {
        toast.dismiss(loadingToastId.current);
        loadingToastId.current = null;
      }
    }
  };

  return (
    <BaseModal open={open} handleClose={handleClose}>
      <GenreForm
        buttonContent={"Update"}
        handleClose={handleClose}
        onSubmit={handleUpdate}
        selectedItem={selectedItem}
      />
    </BaseModal>
  );
}