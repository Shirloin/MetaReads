import { SiBookstack } from "react-icons/si";
import { AiOutlinePlus } from "react-icons/ai";
import { LibraryModel } from "../Props/model";
import { HoverEffect } from "../ui/card-hover-effect";
import { Title } from "../Utility/TitleUtility";

interface LibraryDashboardProps {
  libraryList: LibraryModel[] | null;
  handleLibrarySelect: (library: LibraryModel | null) => void;
}
export default function LibraryDashboard({
  libraryList,
  handleLibrarySelect,
}: LibraryDashboardProps) {
  const createNewLibrary = {
    title: "Add New Library",
    description: (
      <div className="flex w-full items-center justify-center">
        <AiOutlinePlus size={30} />
      </div>
    ),
    onClick: () => {
      handleLibrarySelect(null);
    },
  };
  const data = [
    createNewLibrary,
    ...(libraryList?.map((library) => ({
      title: library.name,
      description: (
        <div className="flex w-full items-center justify-center gap-2">
          {library.bookList.length}
          <SiBookstack size={18} />
        </div>
      ),
      onClick: () => {
        handleLibrarySelect(library);
      },
    })) || []),
  ];

  return (
    <div className="max-h-[100vh] overflow-y-auto">
      <div className="m-5">
        <Title text="Your Library" />
      </div>
      <div className="mx-auto max-w-5xl px-8">
        <HoverEffect items={data} className="cursor-pointer" />
      </div>
    </div>
  );
}
