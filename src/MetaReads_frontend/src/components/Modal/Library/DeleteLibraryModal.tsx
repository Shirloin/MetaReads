import { useRef } from "react";
import DeleteModal from "../DeleteModal";
import { toast } from "react-toastify";
import { ToastLoading } from "../../Form/Notifications/LoadingNotification";
import { ToastSuccess } from "../../Form/Notifications/SuccessNotification";
import { ToastError } from "../../Form/Notifications/ErrorNotification";
import { useDeleteGenre } from "../../Hook/Data/Genre/useDeleteGenre";
import { FormModalProps } from "../../Props/modalProps";

export default function DeleteLibraryModal({
    open,
    handleClose,
    fetchData,
    selectedItem,
}: FormModalProps) {
    const loadingToastId = useRef(null);
    const handleDelete = async () => {
        // @ts-ignore
        loadingToastId.current = ToastLoading("Loading..");
        // Connect to back end
    };
    return (
        <DeleteModal
            open={open}
            handleClose={handleClose}
            title={"Do you want to delete this library and its content ?"}
            handleDelete={handleDelete}
        />
    );
}
