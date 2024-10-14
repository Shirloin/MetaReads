import { useState } from "react";
import SearchBar from "../Form/Input/TextField/SearchBar";
import NavbarProfile from "../Profile/NavbarProfile";
import { useCollapsed } from "../../lib/collapsed_provider";

export default function TopNavbar() {
  const { collapsed } = useCollapsed();
  const [query, setQuery] = useState("");

  return (
    <div
      className="fixed h-[100px] w-full text-white"
      style={{
        backgroundColor: "#14181E",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#14181E",
          opacity: "0.11",
          zIndex: 1,
        }}
      ></div>
      <div className="relative z-10 flex h-full w-full items-center gap-2 px-4">
        <div
          className="w-full flex-grow transition-all duration-300"
          style={{ maxWidth: collapsed ? "85%" : "76%" }}
        >
          <SearchBar query={query} setQuery={setQuery} />
        </div>

        <div className="">
          <NavbarProfile />
        </div>
      </div>
    </div>
  );
}
