import { useRef } from "react";
import { ToastError } from "../../Form/Notifications/ErrorNotification";
import { ToastSuccess } from "../../Form/Notifications/SuccessNotification";
import { ToastLoading } from "../../Form/Notifications/LoadingNotification";
import { toast } from "react-toastify";
import LibraryForm from "../../Form/Layout/LibraryForm";
import BaseModal from "../BaseModal";
import { useUpdateLibrary } from "../../Hook/Data/Library/useUpdateLibrary";
import { FormModalProps } from "../../Props/modalProps";

export default function UpdateLibraryModal({ open, handleClose, fetchData, selectedItem }: FormModalProps) {
    const { updateLibrary, error } = useUpdateLibrary();
    const loadingToastId = useRef(null);


    const handleUpdate = async (name: string) => {
        // @ts-ignores
        loadingToastId.current = ToastLoading("Loading..");
        try {
            const success = await updateLibrary(selectedItem.id, name);
            if (success) {
                ToastSuccess("Library Updated Successfully");
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
            <div className="flex flex-col gap-10">
                {/* <Title text="Add New Library" /> */}
                <div className="flex gap-4 flex-col">
                    <div className="flex gap-2">
                        Enter Library name
                        <div className="flex gap-1">
                            (
                            <div className="text-red-500">Required</div>
                            )
                        </div>
                    </div>
                    <LibraryForm
                        buttonContent={"Update"}
                        handleClose={handleClose}
                        selectedItem={selectedItem}
                        onSubmit={handleUpdate} />
                </div>

            </div>
        </BaseModal >
    );
}
