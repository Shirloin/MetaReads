import { ButtonProps } from "../../Props/buttonProps";

export default function ShimmerButton({ onClick, text }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#efaf21,45%,#e08f00,55%,#efaf21)] bg-[length:200%_100%] px-6 font-medium text-black transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            {text}
        </button>
    );
}