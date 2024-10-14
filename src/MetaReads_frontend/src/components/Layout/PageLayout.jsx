import SideNavbar from "../Navbar/SideNavbar";

export default function PageLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full">
      <SideNavbar />
      <main className="min-h-screen w-full">
        <div className="">{children}</div>
      </main>
    </div>
  );
}
