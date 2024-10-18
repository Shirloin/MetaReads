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



export interface LibraryModel {
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


export const library1: LibraryModel = {
  name: "Uncategorized",
  bookList: [
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "The Mysterious Adventure gen 0",
      author: "John Doe",
      price: "9.99",
      genre: "Adventure",
      summary:
        "A thrilling adventure through unknown lands, filled with mystery and excitement.",
      coverImage:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
    },
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "The Mysterious Adventure",
      author: "John Doe",
      price: "9.99",
      genre: "Adventure",
      summary:
        "A thrilling adventure through unknown lands, filled with mystery and excitement.",
      coverImage:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
    },
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "Love and Destiny",
      author: "Sophia Green",
      price: "14.95",
      genre: "Romance",
      summary:
        "A heartwarming story about love, fate, and the choices that shape our lives.",
      coverImage:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
    },
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "Haha hihi",
      author: "Sophia Green",
      price: "14.95",
      genre: "Romance",
      summary:
        "A heartwarming story about love, fate, and the choices that shape our lives.",
      coverImage:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
    },
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "The Dark Woods",
      author: "Mark Turner",
      price: "7.49",
      genre: "Horror",
      summary:
        "A chilling tale of survival in a haunted forest where no one can hear you scream.",
      coverImage:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
    },
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "The Code Master's Handbook",
      author: "Alex Johnson",
      price: "29.99",
      genre: "Technology",
      summary:
        "A comprehensive guide for aspiring developers and seasoned coders alike.",
      coverImage:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
    },
  ],
};
export const library2: LibraryModel = {
  name: "Library 1",
  bookList: [

    {
      id: Principal.fromText("aaaaa-aa"),
      title: "Love and Destiny",
      author: "Sophia Green",
      price: "14.95",
      genre: "Romance",
      summary:
        "A heartwarming story about love, fate, and the choices that shape our lives.",
      coverImage:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
    },
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "Haha hihi",
      author: "Sophia Green",
      price: "14.95",
      genre: "Romance",
      summary:
        "A heartwarming story about love, fate, and the choices that shape our lives.",
      coverImage:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
    },
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "The Dark Woods",
      author: "Mark Turner",
      price: "7.49",
      genre: "Horror",
      summary:
        "A chilling tale of survival in a haunted forest where no one can hear you scream.",
      coverImage:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
    },
    {
      id: Principal.fromText("aaaaa-aa"),
      title: "The Code Master's Handbook",
      author: "Alex Johnson",
      price: "29.99",
      genre: "Technology",
      summary:
        "A comprehensive guide for aspiring developers and seasoned coders alike.",
      coverImage:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
    },

  ],
};