import { Principal } from "@dfinity/principal";

export interface BookModel {
  id: Principal
  title: string;
  author: string;
  price: string;
  genre: string;
  summary: string;
  coverImage: string;
}

export interface AuthorModel {
  id: Principal
  name: string;
}

export interface GenreModel {
  id: Principal
  name: string;
}

export interface UserModel {
  id: Principal
  username: string,
  money: string,
  photo: string
}

export interface BookDataProps { data: BookModel }
export interface AuthorDataProps { data: BookModel }
export interface UserDataProps { data: UserModel }
export const createBookModel = ({
  id,
  title,
  author,
  price,
  genre,
  summary,
  coverImage,
}: BookModel): BookModel => {
  return {
    id,
    title,
    author,
    price,
    genre,
    summary,
    coverImage,
  };
};

export const dummyBookData: BookModel = {
  id: Principal.fromText("aaaaa-aa"),
  title: "A VERY VERY LONG TITLE",
  author: "Vasang",
  price: "6.969.69",
  genre: "Testing",
  summary:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quisquam cupiditate velit officiis molestias hic.",
  coverImage:
    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
};

export const dummyBook = createBookModel(dummyBookData);
