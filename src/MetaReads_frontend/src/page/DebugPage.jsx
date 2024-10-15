import { ChangeEvent, useEffect, useState } from "react";
import { MetaReads_backend } from "../../../declarations/MetaReads_backend";
import { Principal } from "@dfinity/principal";

export default function DebugPage() {
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  const [book, setBook] = useState({
    title: "",
    description: "",
    cover_image: "cover image",
    author_id: "",
    genre_id: "",
    plan: "Free",
    page_count: 0,
  });

  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);

  const createGenre = async () => {
    try {
      const response = await MetaReads_backend.create_genre({
        id: [],
        name: genre,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createAuthor = async () => {
    try {
      const response = await MetaReads_backend.create_author({
        id: [],
        name: author,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const createBook = async () => {
    const authorIdPrincipal = Principal.fromText(book.author_id);
    const genreIdPrincipal = Principal.fromText(book.genre_id);
    try {
      const response = await MetaReads_backend.create_book({
        id: [],
        title: book.title,
        description: book.description,
        cover_image: book.cover_image,
        author_id: authorIdPrincipal,
        genre_id: genreIdPrincipal,
        page_count: book.page_count,
        plan: book.plan,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      const booksResponse = await MetaReads_backend.get_all_book();
      setBooks(booksResponse);
      const genresResponse = await MetaReads_backend.get_all_genre();
      setGenres(genresResponse);
      const authorsResponse = await MetaReads_backend.get_all_author();
      setAuthors(authorsResponse);
      console.log(booksResponse);
      console.log(genresResponse);
      console.log(authorsResponse);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-10 p-10 text-white">
        <div className="text-5xl font-bold text-white">Debug Page</div>
        <div className="flex w-full gap-4">
          <ul className="flex flex-col">
            {genres.map((genre) => (
              <li>
                <h5>{genre.id.toString()}</h5>
                <h4>{genre.name}</h4>
              </li>
            ))}
          </ul>
          <div className="flex w-full flex-col gap-4">
            <h1 className="text-xl">Create Genre</h1>
            <input
              onChange={(e) => setGenre(e.target.value)}
              value={genre}
              className="rounded-md p-2 text-black ring-1"
              type="text"
            />
            <button
              onClick={createGenre}
              className="rounded-md bg-white p-2 font-bold text-black"
            >
              Create Genre
            </button>
          </div>
        </div>
        <div className="flex w-full gap-4">
          <ul className="flex flex-col">
            {authors.map((author) => (
              <li>
                <h5>{author.id.toString()}</h5>
                <h4>{author.name}</h4>
              </li>
            ))}
          </ul>
          <div className="flex w-full flex-col gap-4">
            <h1 className="text-xl">Create Author</h1>
            <input
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
              className="rounded-md p-2 text-black ring-1"
              type="text"
            />
            <button
              onClick={createAuthor}
              className="rounded-md bg-white p-2 font-bold text-black"
            >
              Create Author
            </button>
          </div>
        </div>
        <div className="flex w-full gap-4">
          <ul className="flex flex-col">
            {books.map((book) => (
              <li>
                <h5>{book.id.toString()}</h5>
                <h4>{book.title}</h4>
              </li>
            ))}
          </ul>
          <div className="flex w-full flex-col gap-4">
            <h1 className="text-xl">Create Book</h1>
            <input
              onChange={handleOnChange}
              placeholder="title"
              className="rounded-md p-2 text-black ring-1"
              type="text"
              name="title"
              value={book.title}
            />
            <input
              onChange={handleOnChange}
              placeholder="description"
              className="rounded-md p-2 text-black ring-1"
              type="text"
              name="description"
              value={book.description}
            />
            <input
              onChange={handleOnChange}
              placeholder="cover image"
              className="rounded-md p-2 text-black ring-1"
              type="text"
              name="cover_image"
              value={book.cover_image}
            />
            <div className="flex w-full flex-col gap-4">
              <h1 className="text-xl">Select Author</h1>
              <select
                className="rounded-md p-2 text-black ring-1"
                value={book.author_id}
                onChange={(e) =>
                  setBook({ ...book, author_id: e.target.value })
                }
              >
                <option value="">Select Author</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id.toString()}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex w-full flex-col gap-4">
              <h1 className="text-xl">Select Genre</h1>
              <select
                className="rounded-md p-2 text-black ring-1"
                value={book.genre_id}
                onChange={(e) => setBook({ ...book, genre_id: e.target.value })}
              >
                <option value="">Select Genre</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id.toString()}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              onChange={handleOnChange}
              placeholder="plan"
              className="rounded-md p-2 text-black ring-1"
              type="text"
              name="plan"
              value={book.plan}
            />
            <input
              onChange={handleOnChange}
              placeholder="page count"
              className="rounded-md p-2 text-black ring-1"
              type="text"
              name="page_count"
              value={book.page_count}
            />
            <button
              onClick={createBook}
              className="rounded-md bg-white p-2 font-bold text-black"
            >
              Create Book
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
