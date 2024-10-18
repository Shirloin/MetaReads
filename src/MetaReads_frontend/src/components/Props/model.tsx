import { Principal } from "@dfinity/principal";

export interface BookModel {
  id: Principal
  title: string;
  author: AuthorModel;
  plan: string;
  genre: GenreModel;
  description: string;
  coverImage: string;
  views: number;
  pages_count: number;
}



export interface LibraryModel {
  id: Principal;
  name: string;
  bookList: BookModel[]
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
  plan,
  genre,
  description,
  coverImage,
}: BookModel): BookModel => {
  return {
    id,
    title,
    author,
    plan,
    genre,
    description,
    coverImage,
    views: 10000,
    pages_count: 12,
  };
};

export const dummyBookData: BookModel = {
  id: Principal.fromText("aaaaa-aa"),
  title: "A VERY VERY LONG TITLE",
  author: { id: Principal.fromText("aaaaa-aa"), name: "Vasang" }, // Updated to AuthorModel
  plan: "6.969.69",
  genre: { id: Principal.fromText("aaaaa-aa"), name: "Testing" }, // Updated to GenreModel
  description:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quisquam cupiditate velit officiis molestias hic.",
  coverImage:
    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
  views: 10000,
  pages_count: 12,
};

export const dummyBook = createBookModel(dummyBookData);

export const library1: LibraryModel = {
  id: Principal.fromText("aaaaa-aa"),
  name: "Uncategorized",
  bookList: [
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "The Mysterious Adventure gen 0",
      author: { id: Principal.fromText("aaaaa-aa"), name: "John Doe" }, // Updated to AuthorModel
      plan: "9.99",
      genre: { id: Principal.fromText("aaaaa-aa"), name: "Adventure" }, // Updated to GenreModel
      description:
        "A thrilling adventure through unknown lands, filled with mystery and excitement.",
      coverImage:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
      views: 10000,
      pages_count: 12,
    },
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "The Mysterious Adventure",
      author: { id: Principal.fromText("aaaaa-aa"), name: "John Doe" }, // Updated to AuthorModel
      plan: "9.99",
      genre: { id: Principal.fromText("aaaaa-aa"), name: "Adventure" }, // Updated to GenreModel
      description:
        "A thrilling adventure through unknown lands, filled with mystery and excitement.",
      coverImage:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
      views: 10000,
      pages_count: 12,
    },
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "Love and Destiny",
      author: { id: Principal.fromText("aaaaa-aa"), name: "Sophia Green" }, // Updated to AuthorModel
      plan: "14.95",
      genre: { id: Principal.fromText("aaaaa-aa"), name: "Romance" }, // Updated to GenreModel
      description:
        "A heartwarming story about love, fate, and the choices that shape our lives.",
      coverImage:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
      views: 10000,
      pages_count: 12,
    },
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "Haha hihi",
      author: { id: Principal.fromText("aaaaa-aa"), name: "Sophia Green" }, // Updated to AuthorModel
      plan: "14.95",
      genre: { id: Principal.fromText("aaaaa-aa"), name: "Romance" }, // Updated to GenreModel
      description:
        "A heartwarming story about love, fate, and the choices that shape our lives.",
      coverImage:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
      views: 10000,
      pages_count: 12,
    },
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "The Dark Woods",
      author: { id: Principal.fromText("aaaaa-aa"), name: "Mark Turner" }, // Updated to AuthorModel
      plan: "7.49",
      genre: { id: Principal.fromText("aaaaa-aa"), name: "Horror" }, // Updated to GenreModel
      description:
        "A chilling tale of survival in a haunted forest where no one can hear you scream.",
      coverImage:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
      views: 10000,
      pages_count: 12,
    },
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "The Code Master's Handbook",
      author: { id: Principal.fromText("aaaaa-aa"), name: "Alex Johnson" }, // Updated to AuthorModel
      plan: "29.99",
      genre: { id: Principal.fromText("aaaaa-aa"), name: "Technology" }, // Updated to GenreModel
      description:
        "A comprehensive guide for aspiring developers and seasoned coders alike.",
      coverImage:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
      views: 10000,
      pages_count: 12,
    },
  ],
};

export const library2: LibraryModel = {
  id: Principal.fromText("aaaaa-aa"),
  name: "Library 1",
  bookList: [
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "Love and Destiny",
      author: { id: Principal.fromText("aaaaa-aa"), name: "Sophia Green" }, // Updated to AuthorModel
      plan: "14.95",
      genre: { id: Principal.fromText("aaaaa-aa"), name: "Romance" }, // Updated to GenreModel
      description:
        "A heartwarming story about love, fate, and the choices that shape our lives.",
      coverImage:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
      views: 10000,
      pages_count: 12,
    },
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "Haha hihi",
      author: { id: Principal.fromText("aaaaa-aa"), name: "Sophia Green" }, // Updated to AuthorModel
      plan: "14.95",
      genre: { id: Principal.fromText("aaaaa-aa"), name: "Romance" }, // Updated to GenreModel
      description:
        "A heartwarming story about love, fate, and the choices that shape our lives.",
      coverImage:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
      views: 10000,
      pages_count: 12,
    },
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "The Dark Woods",
      author: { id: Principal.fromText("aaaaa-aa"), name: "Mark Turner" }, // Updated to AuthorModel
      plan: "7.49",
      genre: { id: Principal.fromText("aaaaa-aa"), name: "Horror" }, // Updated to GenreModel
      description:
        "A chilling tale of survival in a haunted forest where no one can hear you scream.",
      coverImage:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
      views: 10000,
      pages_count: 12,
    },
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "The Code Master's Handbook",
      author: { id: Principal.fromText("aaaaa-aa"), name: "Alex Johnson" }, // Updated to AuthorModel
      plan: "29.99",
      genre: { id: Principal.fromText("aaaaa-aa"), name: "Technology" }, // Updated to GenreModel
      description:
        "A comprehensive guide for aspiring developers and seasoned coders alike.",
      coverImage:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
      views: 10000,
      pages_count: 12,
    },
  ],
};
