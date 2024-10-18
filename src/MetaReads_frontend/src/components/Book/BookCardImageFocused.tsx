import { BsFillPersonFill } from "react-icons/bs";
import { FaBookmark } from "react-icons/fa";
import CurrencyLogo from "../../../public/assets/Currency Logo.png";
import PrimaryButton from "../Form/Button/PrimaryButton";
import { BookDataProps } from "../Props/model";

export default function BookCardImageFocused({ data }: BookDataProps) {
  return (
    <div className="group relative z-10 h-[350px] w-[203px] overflow-hidden rounded-md bg-black shadow-lg">

      <div
        className="absolute inset-0 bg-cover bg-center transition duration-300 group-hover:blur-md"
        style={{ backgroundImage: `url(${data.coverImage})` }}
      ></div>


      <div className="relative z-10 flex flex-col justify-between h-full p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="text-lg font-bold">{data.title}</h3>
        <div>{data.description}</div>
        <div className="flex items-center">
          <BsFillPersonFill className="text-gray-black" />
          <span className="ml-1 text-sm">{data.author.name}</span>
        </div>

      </div>
    </div>
  );
}
