import StoreLogo from "../../../public/assets/Store Logo.png";
import LibraryLogo from "../../../public/assets/Library Logo.png";
import SubscriptionLogo from "../../../public/assets/Subscription Logo.png";
import SignoutLogo from "../../../public/assets/Sign out Logo.png";
import { Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

import { baseLogoutStyle, getHoverStyle, getMenuItemStyle } from "../Utility/StylingUtility";
export default function UserNavigation() {
  const handleLogout = () => {
    // Add Logout Logic Here
  };

  return (
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
  );
}
