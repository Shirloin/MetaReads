import { RiErrorWarningFill } from "react-icons/ri";
import { Title } from "../Utility/TitleUtility";
import BaseModal from "./BaseModal";
import AlertButton from "../Form/Button/AlertButton";
import SecondaryButton from "../Form/Button/SecondaryButton";

export default function DeleteModal({
  open,
  handleClose,
  title,
  handleDelete,
}) {
  return (
    <BaseModal open={open} handleClose={handleClose}>
      <Title text={title} />
      <div className="flex items-center justify-center">
        <RiErrorWarningFill size={120} color="red" />
      </div>
      <div className="flex w-full justify-center gap-3">
        <SecondaryButton text={"Cancel"} onClick={handleClose} />
        <AlertButton text={"Delete"} onClick={handleDelete} />
      </div>
    </BaseModal>
  );
}
