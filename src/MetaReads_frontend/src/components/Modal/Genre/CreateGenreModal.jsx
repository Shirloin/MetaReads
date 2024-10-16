import { useState } from "react";
import AlertButton from "../../Form/Button/AlertButton";
import PrimaryButton from "../../Form/Button/PrimaryButton";
import InputField from "../../Form/Input/TextField/InputField";
import BaseModal from "../BaseModal";
import { Title } from "../../Utility/TitleUtility";
import { MetaReads_backend } from "../../../../../declarations/MetaReads_backend";
import { ToastError } from "../../Form/Notifications/ErrorNotification";
import { ToastSuccess } from "../../Form/Notifications/SuccessNotification";

export default function CreateGenreModal({ open, handleClose }) {
  const [name, setName] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCreate = async () => {
    if (!name || name.trim() === "") {
      ToastError("Genre name can't be empty");
    } else {
      try {
        await MetaReads_backend.create_genre({
          id: [],
          name: name,
        });
        ToastSuccess("Genre Created");
      } catch (error) {}
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
