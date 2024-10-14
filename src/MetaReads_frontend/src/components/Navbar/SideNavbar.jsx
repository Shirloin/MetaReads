import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import StoreLogo from "../../../public/assets/Store Logo.png";
import LibraryLogo from "../../../public/assets/Library Logo.png";
import SubscriptionLogo from "../../../public/assets/Subscription Logo.png";
import SignoutLogo from "../../../public/assets/Sign out Logo.png";
import MetaReadsFullLogo from "../../../public/assets/Meta Reads Full Logo.png";
import MetaReadsLogo from "../../../public/assets/Meta Reads Logo.png";
import { useCollapsed } from "../../lib/collapsed_provider";
import { Link, Outlet } from "react-router-dom";

export default function SideNavbar() {
  const { collapsed } = useCollapsed();
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  const handleLogout = () => {};
  return (
    <>
      <Sidebar
        collapsed={collapsed}
        backgroundColor={hexToRgba("#14181E", 0.7)}
        className="inject-black-border"
      >
        <Menu className="w-100 mb-6 mt-6 flex justify-center align-middle">
          {collapsed ? (
            <img src={MetaReadsLogo} alt="Full Logo" width={200} />
          ) : (
            <img src={MetaReadsFullLogo} alt="Logo" width={200} />
          )}
        </Menu>
        <Menu
          menuItemStyles={{
            button: {
              [`&:hover`]: {
                backgroundColor: "#0d48a159",
                color: "white",
              },
              color: "#D1D3D7",
            },
          }}
        >
          <MenuItem
            icon={
              <img
                src={StoreLogo}
                alt="Store Logo"
                style={{ width: "22px", height: "22px" }}
              />
            }
            component={<Link to="/" />}
          >
            Store
          </MenuItem>
          <MenuItem
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
            style={{ color: "#F85050" }}
            onClick={handleLogout}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
      <Outlet />
    </>
  );
}
