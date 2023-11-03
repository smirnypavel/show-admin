import {
  Menu,
  DashboardMenuItem,
  MenuItemLink,
  MenuProps,
  useSidebarState,
} from "react-admin";
import { useState } from "react";
import Box from "@mui/material/Box";
import LabelIcon from "@mui/icons-material/Label";
import SubMenu from "@/layout/SubMenu";
type MenuName = "menuCatalog" | "menuSales" | "menuCustomers";

const MyMenu = ({ dense = false }: MenuProps) => {
  const [state, setState] = useState({
    menuCatalog: true,
    menuSales: true,
    menuCustomers: true,
  });
  // const translate = useTranslate();
  const [open] = useSidebarState();

  const handleToggle = (menu: MenuName) => {
    setState((state) => ({ ...state, [menu]: !state[menu] }));
  };
  return (
    <Menu
      sx={{
        marginTop: 0,
        "&.RaMenu-closed": {
          opacity: 0.8,
        },
      }}>
      {/* <Menu.DashboardItem />
    <Menu.ResourceItems name="users" /> */}
      {/* <Menu.ResourceItem name="posts" /> */}
      {/* <DashboardMenuItem /> */}
      <Menu.DashboardItem />
      <SubMenu
        handleToggle={() => handleToggle("menuCustomers")}
        isOpen={state.menuCustomers}
        name="Admin"
        icon={<LabelIcon />}
        dense={dense}>
        {/* <MenuItemLink
          to="/customers"
          state={{ _scrollToTop: true }}
          primaryText="Custom"
          leftIcon={<LabelIcon />}
          dense={dense}
        /> */}
        <Menu.ResourceItem name="users" />
        <Menu.ResourceItem name="posts" />
      </SubMenu>
    </Menu>
  );
};
export default MyMenu;
