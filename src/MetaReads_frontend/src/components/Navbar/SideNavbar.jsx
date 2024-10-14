import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import StoreLogo from "../../../public/assets/Store Logo.png";
import LibraryLogo from "../../../public/assets/Library Logo.png";
import SubscriptionLogo from "../../../public/assets/Subscription Logo.png";
import SignoutLogo from "../../../public/assets/Sign out Logo.png";
import MetaReadsFullLogo from "../../../public/assets/Meta Reads Full Logo.png";
import MetaReadsLogo from "../../../public/assets/Meta Reads Logo.png";
import { useCollapsed } from "../../lib/collapsed_provider";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  baseLogoutStyle,
  baseStyle,
  getHoverStyle,
} from "../Utility/StylingUtility";

export default function SideNavbar() {
  const { collapsed, setCollapsed } = useCollapsed();
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  const handleLogout = () => {
    // Add Logout Logic Here
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed); // Toggle the collapsed state
  };

  const location = useLocation();

  const getMenuItemStyle = (path) => {
    return location.pathname === path
      ? getHoverStyle() // Active styles
      : baseStyle(); // Default styles
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

        <Menu
          menuItemStyles={{
            button: {
              [`&:hover`]: getHoverStyle(),
              color: "#D1D3D7",
            },
          }}
        >
          <MenuItem
            style={getMenuItemStyle("/")}
            icon={
              <img
                src={StoreLogo}
                alt="Store Logo"
                style={{
                  width: "22px",
                  height: "22px",
                }}
              />
            }
            component={<Link to="/" />}
          >
            Store
          </MenuItem>
          <MenuItem
            style={getMenuItemStyle("/library")}
            icon={
              <img
                src={LibraryLogo}
                alt="Library Logo"
                style={{ width: "22px", height: "22px" }}
              />
            }
            component={<Link to="/library" />}
          >
            Library
          </MenuItem>
          <MenuItem
            style={getMenuItemStyle("/subscriptions")}
            icon={
              <img
                src={SubscriptionLogo}
                alt="Library Logo"
                style={{ width: "22px", height: "22px" }}
              />
            }
            component={<Link to="/subscriptions" />}
          >
            Subscriptions
          </MenuItem>
          <MenuItem
            icon={
              <img
                src={SignoutLogo}
                alt="Library Logo"
                style={{ width: "22px", height: "22px" }}
              />
            }
            style={baseLogoutStyle()}
            onClick={handleLogout}
          >
            Logout
          </MenuItem>
        </Menu>
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
