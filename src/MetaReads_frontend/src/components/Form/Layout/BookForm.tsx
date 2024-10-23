import { useEffect, useState } from "react";
import PrimaryButton from "../Button/PrimaryButton";
import InputField, { InputBookField } from "../Input/TextField/InputField";
import { Title } from "../../Utility/TitleUtility";
import { ToastError } from "../Notifications/ErrorNotification";
import SecondaryButton from "../Button/SecondaryButton";
import { Principal } from "@dfinity/principal";
import { AuthorModel, GenreModel } from "../../Props/model";
import { Box, TextField, MenuItem } from "@mui/material"; // Import MenuItem from Material-UI
import useAuthors from "../../Hook/Data/Author/useAuthors";
import useGenres from "../../Hook/Data/Genre/useGenres";
import SelectGenreBookField from "../Input/TextField/SelectGenreBookField";
import SelectAuthorBookField from "../Input/TextField/SelectAuthorBookField";

interface ModalFormProps {
  handleClose: () => void;
  onSubmit: (
    title: string,
    author: AuthorModel,
    book_url: string,
    plan: string,
    genre: GenreModel,
    description: string,
    coverImage: string,
    pages_count: number,
  ) => void;
  selectedItem?: { name: string };
  buttonContent: string;
}

export default function BookForm({
  handleClose,
  onSubmit,
  selectedItem,
  buttonContent,
}: ModalFormProps) {
  const [data, setData] = useState<{
    title: string;
    author: any;
    book_url: string;
    plan: string;
    genre: any;
    description: string;
    coverImage: string;
    pages_count: number;
  }>({
    title: "",
    author: Principal.fromText("aaaaa-aa"),
    book_url: "",
    plan: "",
    genre: Principal.fromText("aaaaa-aa"),
    description: "",
    coverImage: "",
    pages_count: 0,
  });

  const handleChange = async (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [rows, fetchData] = useGenres();
  useEffect(() => {
    // Log fetched data or handle empty case
    if (rows && rows.length > 0) {
      console.log("Fetched rows:", rows);
    } else {
      console.log("No data available or rows are empty");
    }
  }, [rows]);

  const print = () => {
    console.log(Principal.fromText(data.genre));
  };

  return (
    <>
      <Title text={"Book Form"} />
      <div className="my-4">
        <InputBookField
          label={"Book Title"}
          value={data.title}
          name="title"
          onChange={handleChange}
        />
      </div>
      <div className="my-4">
        <InputBookField
          label={"Book Url"}
          value={data.book_url}
          name="book_url"
          onChange={handleChange}
        />
      </div>
      <div className="my-4">
        <InputBookField
          label={"Plan"}
          value={data.plan}
          name="plan"
          onChange={handleChange}
        />
        <div className="my-4">
          <InputBookField
            label={"Cover Image"}
            value={data.coverImage}
            name="coverImage"
            onChange={handleChange}
          />
        </div>
        <div className="my-4">
          <InputBookField
            label={"Pages Count"}
            value={data.pages_count}
            name="pages_count"
            onChange={handleChange}
            type="number"
          />
        </div>
        <SelectGenreBookField onChange={handleChange} genre={data.genre} />
        <SelectAuthorBookField onChange={handleChange} author={data.author} />
        <div className="my-4">
          <InputBookField
            label={"Description"}
            value={data.description}
            name="description"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex w-full justify-center gap-3">
        <SecondaryButton text={"Cancel"} onClick={handleClose} />
        <PrimaryButton text={buttonContent} onClick={print} />
      </div>
    </>
  );
}
