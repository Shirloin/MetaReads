import { useEffect, useState } from "react";
import PrimaryButton from "../Button/PrimaryButton";
import InputField from "../Input/TextField/InputField";
import { Title } from "../../Utility/TitleUtility";
import { ToastError } from "../Notifications/ErrorNotification";
import SecondaryButton from "../Button/SecondaryButton";

export default function GenreForm({
  handleClose,
  onSubmit,
  selectedItem,
  buttonContent,
}) {
  const [name, setName] = useState("");
  useEffect(() => {
    if (selectedItem) {
      setName(selectedItem.name);
    }
  }, [selectedItem]);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async () => {
    if (!name || name.trim() === "") {
      ToastError("Genre name can't be empty");
    } else {
      onSubmit(name);
    }
  };

  return (
    <>
      <Title text={"Genre Form"} />
      <div className="my-4">
        <InputField
          label={"Genre Name"}
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div className="flex w-full justify-center gap-3">
        <SecondaryButton text={"Cancel"} onClick={handleClose} />
        <PrimaryButton text={buttonContent} onClick={handleSubmit} />
      </div>
    </>
  );
}
