import SearchBar from "../Form/Input/TextField/SearchBar";

export default function TopNavbar() {
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
          opacity: "0.71",
          zIndex: -1,
        }}
      ></div>
      <div className="relative z-10 flex h-full w-full items-center justify-around gap-3 px-4">
        <div className="w-10/12">
          <SearchBar />
        </div>
        <div className="w-2/12">Profile here</div>
      </div>
    </div>
  );
}
