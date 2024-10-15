import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { Sidebar, Menu } from "react-pro-sidebar";
import MetaReadsFullLogo from "../../../public/assets/Meta Reads Full Logo.png";
import MetaReadsLogo from "../../../public/assets/Meta Reads Logo.png";
import { useCollapsed } from "../../lib/collapsed_provider";
import { Outlet } from "react-router-dom";
import UserNavigation from "./UserNavigation";
import AdminNavigation from "./AdminSideNavbar";

export default function SideNavbar() {
  const { collapsed, setCollapsed } = useCollapsed();
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed); // Toggle the collapsed state
  };

  return (
    <div style={{ position: "relative" }} className="h-screen">
      <Sidebar
        collapsed={collapsed}
        backgroundColor={hexToRgba("#14181E", 0.7)}
        className="inject-black-border inject-width h-full"
        style={{ position: "fixed", top: 0, left: 0 }}
      >
        <Menu className="w-100 mb-6 mt-6 flex justify-center align-middle">
          {collapsed == true && (
            <img src={MetaReadsLogo} alt="Full Logo" width={40} />
          )}
          {collapsed == false && (
            <img src={MetaReadsFullLogo} alt="Logo" width={200} />
          )}
        </Menu>
        <UserNavigation />
        <AdminNavigation />
      </Sidebar>
      <Outlet />
      <div
        onClick={toggleSidebar}
        style={{
          position: "fixed",
          top: "50%",
          left: collapsed ? "80px" : "230px",
          right: "100%",
          transform: "translate(50%, 0)",
          cursor: "pointer",
          zIndex: 1000,
          transition: "left 0.28s ease",
        }}
      >
        {collapsed ? (
          <IoIosArrowDroprightCircle
            className="cursor-pointer text-white"
            size={30}
            style={{
              color: "#EFAF21",
              //   backgroundColor: "#D1D3D7",
              borderRadius: "30px",
            }}
          />
        ) : (
          <IoIosArrowDropleftCircle
            className="cursor-pointer"
            size={30}
            style={{
              color: "#EFAF21",
              //   backgroundColor: "#D1D3D7",
              borderRadius: "30px",
            }}
          />
        )}
      </div>
    </div>
  );
}
