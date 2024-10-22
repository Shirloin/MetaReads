export default function LitupButton({ text, className, }: { text?: string, className?: string }) {
    return (
        <button className="p-[3px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#efaf21] to-[#efaf21] rounded-lg" />
            <div className={`px-6 py-3  bg-black rounded-[6px]  relative group transition duration-200 text-white uppercase ${className}`}>
                {text}
            </div>
        </button >
    )
}