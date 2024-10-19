import { ButtonProps } from "../../Props/buttonProps";

export default function GradientButton({ onClick, text, color }: ButtonProps) {
  return (
    <button className="p-[3px] relative" onClick={onClick}>
      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-cyan-600 rounded-lg" />
      <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
        {text}
      </div>
    </button>

  );
}
