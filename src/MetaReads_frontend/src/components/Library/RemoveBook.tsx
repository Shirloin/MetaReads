import { useModalState } from "../Hook/Ui/useModalState"
import RemoveLibraryModal from "../Modal/Library/RemoveLibraryModal";

export default function RemoveBook({ bookId, libraryId, fetchData }: { bookId: string, libraryId: string, fetchData: () => {} }) {
    const { modalState, handleClose, handleOpen } = useModalState();
    return (
        <>
            <RemoveLibraryModal bookId={bookId} open={modalState.other} handleClose={handleClose} fetchData={fetchData} selectedItem={libraryId} />
            <button className="p-[3px] relative" onClick={handleOpen}>
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-700 rounded-lg" />
                <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                    Remove
                </div>
            </button>
        </>
    )
}