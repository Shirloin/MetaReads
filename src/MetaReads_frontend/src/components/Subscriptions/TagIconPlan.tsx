import { FaCrown } from "react-icons/fa";

export default function TagIconPlan({ plan }: { plan: string }) {
  return (
    <>
      {plan !== "free" && (
        <div className="absolute left-2 top-2 z-50 rounded-md bg-black/80 p-2">
          <FaCrown
            className={`text-lg ${plan == "basic" ? "text-neutral-300" : "text-orange-300"} `}
          />
        </div>
      )}
    </>
  );
}
