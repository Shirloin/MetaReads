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
      <div className="relative z-10">
        {/* Content Layer */}
        Top Nav
      </div>
    </div>
  );
}
