import { useCollapsed } from "../../lib/collapsed_provider";
import SideNavbar from "../Navbar/SideNavbar";

export default function PageLayout({ children }) {
  const { collapsed } = useCollapsed();
  return (
    <div className="flex min-h-screen w-full">
      <SideNavbar />
      <main
        className="min-h-screen w-full transition-all duration-30"
        style={{ paddingLeft: collapsed ? "97px" : "250px" }}
      >
        <div className="w-full">{children}</div>
      </main>
    </div>
  );
}
