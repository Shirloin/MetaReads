import { useRef } from "react";
import { ToastError } from "../../Form/Notifications/ErrorNotification";
import { ToastSuccess } from "../../Form/Notifications/SuccessNotification";
import { ToastLoading } from "../../Form/Notifications/LoadingNotification";
import { toast } from "react-toastify";
import LibraryForm from "../../Form/Layout/LibraryForm";
import BaseModal from "../BaseModal";
import { useCreateLibrary } from "../../Hook/Data/Library/useCreateLibrary";
import { FormModalProps } from "../../Props/modalProps";
import SecondaryButton from "../../Form/Button/SecondaryButton";
import PrimaryButton from "../../Form/Button/PrimaryButton";
import { Title } from "../../Utility/TitleUtility";

export default function CreateLibraryModal({ open, handleClose, fetchData }: FormModalProps) {
    const { createLibrary, error } = useCreateLibrary();
    const loadingToastId = useRef(null);

    const onSubmit = async (
        e:
            | React.KeyboardEvent<HTMLInputElement>
            | React.FocusEvent<HTMLInputElement> | null,
        name: string | undefined
    ) => {
        if (e && "key" in e && e.key !== "Enter") return;
        // @ts-ignores
        loadingToastId.current = ToastLoading("Loading..");
        try {
            if (name) {
                const success = await createLibrary(name);
                if (success) {
                    ToastSuccess("Library Created Successfully");
                    fetchData();
                } else {
                    ToastError(error);
                }
            }
        } finally {
            if (loadingToastId.current) {
                toast.dismiss(loadingToastId.current);
                loadingToastId.current = null;
            }
        }
    };
    const handleSubmit = (name?: string) => {
        onSubmit(null, name);
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
                    <LibraryForm onSubmit={onSubmit} />
                </div>
                <div className="flex w-full justify-center gap-3 ">
                    <SecondaryButton text={"Cancel"} onClick={handleClose} />
                    <PrimaryButton text={"Create"} onClick={handleSubmit} />
                </div>
            </div>
        </BaseModal >
    );
}
