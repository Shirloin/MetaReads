import { ChangeEvent, useEffect, useState } from "react";
import { MetaReads_backend } from "../../../declarations/MetaReads_backend"

export default function DebugPage() {

    const [author, setAuthor] = useState("")
    const [genre, setGenre] = useState("")

    const [books, setBooks] = useState([])

    const createGenre = async () => {
        try {
            const response = await MetaReads_backend.create_genre({ id: [], name: genre })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await MetaReads_backend.get_all_book()
            console.log(response)
        }
        fetchData()
    }, [])

    return (
        <>
            <div className="text-white p-10 max-w-3xl  mx-auto flex flex-col justify-center items-center gap-10">
                <div className="font-bold text-5xl text-white ">Debug Page</div>
                <div className="flex flex-col gap-4 w-full " >
                    <h1 className="text-xl">Create Genre</h1>
                    <input onChange={(e) => setGenre(e.target.value)} value={genre} className="p-2 ring-1 rounded-md text-black" type="text" />
                    <button onClick={createGenre} className="p-2 rounded-md bg-white text-black font-bold">Create Genre</button>
                </div>
                <form className="flex flex-col gap-4 w-full " action="">
                    <h1 className="text-xl">Create Author</h1>
                    <input onChange={(e) => setAuthor(e.target.value)} value={author} className="p-2 ring-1 rounded-md text-black" type="text" />
                    <button className="p-2 rounded-md bg-white text-black font-bold">Create Author</button>
                </form>
                <form className="flex flex-col gap-4 w-full " action="">
                    <h1 className="text-xl">Create Book</h1>
                    <input placeholder="title" className="p-2 ring-1 rounded-md text-black" type="text" name="title" />
                    <input placeholder="description" className="p-2 ring-1 rounded-md text-black" type="text" name="description" />
                    <input placeholder="cover image" className=" p-2 ring-1 rounded-md text-black" type="text" name="cover_image" />
                    <input placeholder="author_id" className="p-2 ring-1 rounded-md text-black" type="text" name="author_id" />
                    <input placeholder="genre_id" className="p-2 ring-1 rounded-md text-black" type="text" name="genre_id" />
                    <input placeholder="plan" className="p-2 ring-1 rounded-md text-black" type="text" name="plan" />
                    <input placeholder="page count" className="p-2 ring-1 rounded-md text-black" type="text" name="page_count" />
                    <button className="p-2 rounded-md bg-white text-black font-bold">Create Book</button>
                </form>
            </div>
        </>
    );
}
