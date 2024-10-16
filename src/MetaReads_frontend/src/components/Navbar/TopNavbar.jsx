import { useState } from "react";
import SearchBar from "../Form/Input/TextField/SearchBar";
import NavbarProfile from "../Profile/NavbarProfile";
import { useCollapsed } from "../../lib/collapsed_provider";

export default function TopNavbar() {
  const { collapsed } = useCollapsed();
  const [query, setQuery] = useState("");

  return (
    <div
      className="h-[100px] text-white transition-all duration-300 w-full bg-[#14181E]"
    >
      {/* Set relative positioning on the parent to constrain the absolute div */}
      <div className="relative h-full w-full">
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#d",
            opacity: "0.11",
            zIndex: 1,
          }}
        ></div>

        <div className="relative z-10 flex h-full w-full items-center gap-2 px-4">
          {/* SearchBar takes the remaining space */}
          <div className="flex-grow transition-all duration-300">
            <SearchBar query={query} setQuery={setQuery} />
          </div>

          {/* NavbarProfile has a fixed width */}
          <div className="w-[200px]">
            <NavbarProfile />
          </div>
        </div>
      </div>
    </div>
  );
}
