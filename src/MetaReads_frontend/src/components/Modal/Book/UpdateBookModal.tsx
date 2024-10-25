import { useRef } from "react";
import { ToastError } from "../../Form/Notifications/ErrorNotification";
import { ToastSuccess } from "../../Form/Notifications/SuccessNotification";
import { ToastLoading } from "../../Form/Notifications/LoadingNotification";
import { toast } from "react-toastify";
import AuthorForm from "../../Form/Layout/AuthorForm";
import BaseModal from "../BaseModal";
import { useUpdateAuthor } from "../../Hook/Data/Author/useUpdateAuthor";
import { FormModalProps } from "../../Props/modalProps";
import BookForm from "../../Form/Layout/BookForm";
import { Principal } from "@dfinity/principal";
import { useUpdateBook } from "../../Hook/Data/Book/useUpdateBook";

export default function UpdateBookModal({
  open,
  handleClose,
  fetchData,
  selectedItem,
}: FormModalProps) {
  const { updateBook, error } = useUpdateBook();
  const loadingToastId = useRef(null);

  const handleUpdate = async (
    title: string,
    author: Principal,
    book_url: string,
    plan: string,
    genre: Principal,
    description: string,
    coverImage: string,
    pages_count: any,
  ) => {
    // @ts-ignore
    loadingToastId.current = ToastLoading("Loading..");
    try {
      const success = await updateBook(
        selectedItem.id,
        title,
        author,
        book_url,
        plan,
        genre,
        description,
        coverImage,
        pages_count,
      );
      if (success) {
        ToastSuccess("Author Created Successfully");
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
      <BookForm
        buttonContent={"Update"}
        handleClose={handleClose}
        onSubmit={handleUpdate}
        selectedItem={selectedItem}
      />
    </BaseModal>
  );
}
