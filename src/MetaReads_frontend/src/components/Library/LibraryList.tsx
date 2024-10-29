import { IoMdAddCircle } from "react-icons/io";
import { AiFillFileAdd } from "react-icons/ai";
import { useState } from 'react';
import { useModalState } from '../Hook/Ui/useModalState';
import useLibraries from "../Hook/Data/Library/useLibraries";
import AddLibraryModal from "../Modal/Library/AddLibraryModal";

export default function LibraryList({ bookId }: { bookId: string }) {
    const { modalState, handleClose, handleOpen } = useModalState()
    const [data, fetchData] = useLibraries()


    return (
        <div>
            <AddLibraryModal open={modalState.other} handleClose={handleClose} fetchData={fetchData} selectedItem={data} bookId={bookId} />
            <button
                onClick={handleOpen}
                className={`flex gap-2  items-center shadow-[0_0_0_3px_#000000_inset] p-2 bg-black  border border-transparent  dark:text-white text-black rounded-md  transform hover:-translate-y-1 transition duration-400 text-base h-full dark:border-[#EFAF21]`}
            >
                <IoMdAddCircle color="white" size={25} />
                Add to library
            </button>

        </div>
    );
}
