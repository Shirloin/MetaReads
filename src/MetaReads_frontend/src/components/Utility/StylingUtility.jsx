import { useLocation } from "react-router-dom";

export const getMenuItemStyle = (path) => {
  const location = useLocation();
  return location.pathname === path
    ? getHoverStyle() // Active styles
    : baseStyle(); // Default styles
};

export const getHoverStyle = () => {
  return {
    backgroundColor: "#484F5A",
    color: "#FFFFFF",
    borderRadius: "8px",
    margin: "10px",
  };
};

export const baseStyle = () => {
  return {
    margin: "10px",
  };
};

export const baseLogoutStyle = () => {
  return {
    margin: "10px",
    color: "#F85050",
  };
};
