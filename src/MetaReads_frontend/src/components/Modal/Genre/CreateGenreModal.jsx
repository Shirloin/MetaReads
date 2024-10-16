import { useRef, useState } from "react";
import AlertButton from "../../Form/Button/AlertButton";
import PrimaryButton from "../../Form/Button/PrimaryButton";
import InputField from "../../Form/Input/TextField/InputField";
import BaseModal from "../BaseModal";
import { Title } from "../../Utility/TitleUtility";
import { ToastError } from "../../Form/Notifications/ErrorNotification";
import { ToastSuccess } from "../../Form/Notifications/SuccessNotification";
import { useCreateGenre } from "../../Hook/Genre/useCreateGenre";
import { ToastLoading } from "../../Form/Notifications/LoadingNotification";
import { toast } from "react-toastify";

export default function CreateGenreModal({ open, handleClose, fetchData }) {
  const [name, setName] = useState("");
  const { createGenre, error, success } = useCreateGenre();
  const loadingToastId = useRef(null);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCreate = async () => {
    if (!name || name.trim() === "") {
      ToastError("Genre name can't be empty");
    } else {
      loadingToastId.current = ToastLoading("Loading..");
      try {
        await createGenre(name);
        if (success) {
          ToastSuccess("Genre Created Successfully");
          fetchData();
        }
        if (error) {
          ToastError(error);
        }
      } finally {
        if (loadingToastId.current) {
          toast.dismiss(loadingToastId.current);
          loadingToastId.current = null;
        }
      }
    }
  };

  return (
    <BaseModal open={open} handleClose={handleClose}>
      <Title text={"Add Genre"} />
      <div className="my-4">
        <InputField
          label={"Genre Name"}
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div className="flex w-full justify-end gap-3">
        <AlertButton text={"Cancel"} onClick={handleClose} />
        <PrimaryButton text={"Create"} onClick={handleCreate} />
      </div>
    </BaseModal>
  );
}
