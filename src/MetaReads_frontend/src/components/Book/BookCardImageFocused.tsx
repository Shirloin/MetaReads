import { AiFillClockCircle } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { BookDataProps, BookModel } from "../Props/model";
import Tooltip from "@mui/material/Tooltip";

export default function BookCardImageFocused({
  data,
  handleBookSelect,
}: BookDataProps & { handleBookSelect: (book: BookModel | null) => void }) {
  const onCardClick = () => {
    handleBookSelect(data);
  };

  return (
    <div
      className="group relative z-10 h-[350px] w-[203px] cursor-pointer overflow-hidden rounded-md bg-black shadow-lg transition-shadow duration-300 group-hover:shadow-2xl"
      onClick={onCardClick}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition duration-300 group-hover:blur-md"
        style={{ backgroundImage: `url(${data.coverImage})` }}
      ></div>

      <div className="relative z-10 flex h-full flex-col justify-between p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="text-lg font-bold">{data.title}</h3>
        <div className="flex flex-col gap-2">
          <Tooltip title="Total Reading Time" arrow>
            <div className="flex items-center gap-2 font-medium">
              <AiFillClockCircle />
              <div className="ml-1 text-sm">14 hours</div>
            </div>
          </Tooltip>
          <Tooltip title="Author" arrow>
            <div className="flex items-center gap-2 font-medium">
              <BsFillPersonFill className="text-gray-black" />
              <span className="ml-1 text-sm">{data.author.name}</span>
            </div>
          </Tooltip>
          <div>{data.description}</div>
        </div>
      </div>
    </div>
  );
}
