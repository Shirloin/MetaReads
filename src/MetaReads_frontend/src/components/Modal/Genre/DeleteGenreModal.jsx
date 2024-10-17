import { useRef } from "react";
import DeleteModal from "../DeleteModal";
import { toast } from "react-toastify";
import { ToastLoading } from "../../Form/Notifications/LoadingNotification";
import { ToastSuccess } from "../../Form/Notifications/SuccessNotification";
import { ToastError } from "../../Form/Notifications/ErrorNotification";
import { useDeleteGenre } from "../../Hook/Data/Genre/useDeleteGenre";

export default function DeleteGenreModal({
  open,
  handleClose,
  fetchData,
  selectedItem,
}) {
  const { deleteGenre, error } = useDeleteGenre();
  const loadingToastId = useRef(null);
  const handleDelete = async () => {
    loadingToastId.current = ToastLoading("Loading..");
    try {
      const success = await deleteGenre(selectedItem.id);
      if (success) {
        ToastSuccess("Genre Created Successfully");
        fetchData();
      } else {
        ToastError(error);
      }
    } finally {
      handleClose();

      if (loadingToastId.current) {
        toast.dismiss(loadingToastId.current);
        loadingToastId.current = null;
      }
    }
  };
  return (
    <DeleteModal
      open={open}
      handleClose={handleClose}
      title={"Do you want to delete this genre ?"}
      handleDelete={handleDelete}
    />
  );
}
