import { ChangeEvent, useEffect, useState } from "react";
import { MetaReads_backend } from "../../../declarations/MetaReads_backend";
import { canisterId, createActor } from "../../../declarations/MetaReads_frontend";
import { MetaReads_frontend } from "../../../declarations/MetaReads_frontend";
import { Principal } from "@dfinity/principal";
import { MdQueryBuilder } from "react-icons/md";
import { AuthClient } from "@dfinity/auth-client";

export default function DebugPage() {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [query, setQuery] = useState("");

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

  const [books, setBooks] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);



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
        book_url: "",
        page_count: BigInt(book.page_count),
        plan: book.plan,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteBook = async (id: []) => {
    console.log(id.toString());
    const book_id = Principal.fromText(id.toString());
    try {
      const response = await MetaReads_backend.delete_book(book_id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "cover_image") {
      const data = new FileReader();
      data.addEventListener('load', () => {
        if (data.result && typeof data.result === 'string') {
          setBook({ ...book, [name]: data.result });
        }
      });
      if (e.target.files && e.target.files[0]) {
        data.readAsDataURL(e.target.files[0]);
      }
    } else {
      setBook({ ...book, [name]: value });
    }
  };

  useEffect(() => {
    if (!isAuthenticated || !authClient) {
      return;
    }
    (async () => {
      const identity = authClient.getIdentity();
      const assetActor = createActor(canisterId, {
        agentOptions: { identity: identity },
      });

      const foobar = [...new TextEncoder().encode("foobar")];

      const update = await assetActor.store({
        key: "/foobar.txt",
        content: foobar,
        sha256: [],
        content_type: "text/plain",
        content_encoding: "identity",
      }); console.log(update)

      const get = await assetActor.get({
        key: "/foobar.txt",
        accept_encodings: ["identity"],
      });
      console.log(get)
      debugger;
    })();
  }, [setAuthClient, setIsAuthenticated, isAuthenticated]);

  useEffect(() => {
    (async () => {
      const authClient = await AuthClient.create();
      setAuthClient(authClient);
      setIsAuthenticated(await authClient.isAuthenticated());
    })();
  }, [setAuthClient, setIsAuthenticated]);

  useEffect(() => {
    const fetchData = async () => {
      const genresResponse = await MetaReads_backend.get_all_genre();
      setGenres(genresResponse as any);
      const authorsResponse = await MetaReads_backend.get_all_author();
      setAuthors(authorsResponse as any);
      console.log(genresResponse);
      console.log(authorsResponse as any);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const booksResponse = await MetaReads_backend.get_all_book({ page: BigInt(page), limit: BigInt(5), query: query });
      if ('Ok' in booksResponse) {
        const data = booksResponse.Ok
        setBooks(data.books as any);
        console.log(data.books);
      }
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


        <div className="flex flex-col gap-4 w-full">
          <input type="text" value={query} onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} />
          <div className="flex w-full gap-4">
            <div className="flex w-full max-w-md flex-col gap-4">
              <h1 className="text-xl">Create Book</h1>
              <img className="w-20 h-40" src={book.cover_image} alt="" />
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
                type="file"
                name="cover_image"
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
            <ul className="flex flex-col">
              {books.map((book, index) => (
                <li>
                  <h5>{index}</h5>
                  <h5>{book.id.toString()}</h5>
                  <h4>{book.title}</h4>
                  <img className="w-20 h-40" src={book.cover_image} alt="" />
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
          </div>
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
