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

  const [page, setPage] = useState(0);

  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);

  const createGenre = async () => {
    try {
      const response = await MetaReads_backend.create_genre({
        id: [],
        name: genre,
      });
      console.log(response);
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
      console.log(response);
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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const updateGenre = async () => {
    try {
      const response = await MetaReads_backend.update_genre({
        id: [],
        name: genre,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const updateAuthor = async () => {
    try {
      const response = await MetaReads_backend.create_author({
        id: [],
        name: author,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const updateBook = async () => {
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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteGenre = async (id) => {
    console.log("delete genre");
    console.log(id.toString());
    const genre_id = Principal.fromText(id.toString());
    try {
      const response = await MetaReads_backend.delete_genre(genre_id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteAuthor = async (id) => {
    console.log("delete author");
    console.log(id.toString());
    const author_id = Principal.fromText(id.toString());
    try {
      const response = await MetaReads_backend.delete_author(author_id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteBook = async (id) => {
    console.log(id.toString());
    const book_id = Principal.fromText(id.toString());
    try {
      const response = await MetaReads_backend.delete_book(book_id);
      console.log(response);
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
      const genresResponse = await MetaReads_backend.get_all_genre();
      setGenres(genresResponse);
      const authorsResponse = await MetaReads_backend.get_all_author();
      setAuthors(authorsResponse);
      console.log(genresResponse);
      console.log(authorsResponse);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const booksResponse = await MetaReads_backend.get_all_book(page, 10);
      setBooks(booksResponse);
      console.log(booksResponse);
    };
    fetchData();
  }, [page]);

  useEffect(() => {
    const fetchData = async () => {
      const user_id = Principal.fromText(
        "ce4yv-ijra4-grmm4-efniz-3hux5-pvct7-mz2l4-2vqeb-d5vju-3cqah-fia",
      );
      const userResponse = await MetaReads_backend.get_user(user_id);
      console.log("User");
      console.log(userResponse);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-10 p-10 text-white">
        <div className="text-5xl font-bold text-white">Debug Page</div>
        <div className="flex w-full gap-4">
          <div className="flex w-full max-w-md flex-col gap-4">
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
            <button
              onClick={updateGenre}
              className="rounded-md bg-white p-2 font-bold text-black"
            >
              Update Genre
            </button>
          </div>
          <ul className="flex flex-col">
            {genres.map((genre, index) => (
              <li>
                <h5>{index}</h5>
                <h5>{genre.id.toString()}</h5>
                <h4>{genre.name}</h4>
                <button
                  onClick={() => deleteGenre(genre.id)}
                  className="rounded-md bg-red-500 p-2 text-white"
                >
                  Delete
                </button>
                <p>========================================</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-full gap-4">
          <div className="flex w-full max-w-md flex-col gap-4">
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
            <button
              onClick={updateAuthor}
              className="rounded-md bg-white p-2 font-bold text-black"
            >
              Update Author
            </button>
          </div>
          <ul className="flex flex-col">
            {authors.map((author, index) => (
              <li>
                <h5>{index}</h5>
                <h5>{author.id.toString()}</h5>
                <h4>{author.name}</h4>
                <button
                  onClick={() => deleteAuthor(author.id)}
                  className="rounded-md bg-red-500 p-2 text-white"
                >
                  Delete
                </button>
                <p> ========================================</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-full gap-4">
          <div className="flex w-full max-w-md flex-col gap-4">
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
            <button
              onClick={updateBook}
              className="rounded-md bg-white p-2 font-bold text-black"
            >
              Update Book
            </button>
          </div>
          <ul className="flex flex-col">
            {books.map((book, index) => (
              <li>
                <h5>{index}</h5>
                <h5>{book.id.toString()}</h5>
                <h4>{book.title}</h4>
                <h4>{book.author.name}</h4>
                <h4>{book.genre.name}</h4>
                <button
                  onClick={() => deleteBook(book.id)}
                  className="rounded-md bg-red-500 p-2 text-white"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <h1>Page: {page}</h1>
            <button
              onClick={() => {
                setPage(page - 1);
              }}
              className="rounded-md bg-white p-2 text-black"
            >
              Prev
            </button>
            <button
              onClick={() => {
                setPage(page + 1);
              }}
              className="rounded-md bg-white p-2 text-black"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
