import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import { Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { getHoverStyle, getMenuItemStyle } from "../Utility/StylingUtility";
import { createUrl } from "../Utility/UrlUtility";
export default function AdminNavigation() {
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
        style={getMenuItemStyle("/admin/genre")}
        icon={<AiOutlineUnorderedList size={22} />}
        component={<Link to={createUrl("/admin/genre")} />}
      >
        Genre
      </MenuItem>
      <MenuItem
        style={getMenuItemStyle("/admin/author")}
        icon={<BsPeopleFill size={22} />}
        component={<Link to={createUrl("/admin/author")} />}
      >
        Author
      </MenuItem>
    </Menu>
  );
}
