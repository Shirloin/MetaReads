import StoreLogo from "../../../public/assets/Store Logo.png";
import LibraryLogo from "../../../public/assets/Library Logo.png";
import SubscriptionLogo from "../../../public/assets/Subscription Logo.png";
import SignoutLogo from "../../../public/assets/Sign out Logo.png";
import { Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

import {
  baseLogoutStyle,
  getHoverStyle,
  getMenuItemStyle,
} from "../Utility/StylingUtility";
import { createUrl } from "../Utility/UrlUtility";
import { AuthClient } from "@dfinity/auth-client";
export default function UserNavigation() {
  const days = BigInt(1);
  const hours = BigInt(24);
  const nanoseconds = BigInt(3600000000000);
  const defaultOptions = {
    createOptions: {
      idleOptions: {
        disableIdle: true,
      },
    },
    loginOptions: {
      identityProvider: "https://identity.ic0.app/",
      maxTimeToLive: days * hours * nanoseconds,
    },
  };
  const handleLogout = async () => {
    const authClient = await AuthClient.create(defaultOptions.createOptions);
    await authClient.logout();
    document.cookie = 'identity=; Max-Age=-99999999;';  

    window.location.href = "/login";
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
        component={<Link to={createUrl("/")} />}
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
        component={<Link to={createUrl("/library")} />}
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
        component={<Link to={createUrl("/subscriptions")} />}
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
