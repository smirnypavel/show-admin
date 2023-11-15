import {
  Menu,
  DashboardMenuItem,
  MenuItemLink,
  MenuProps,
  useSidebarState,
  usePermissions,
} from "react-admin";
import { useState } from "react";
import Box from "@mui/material/Box";
import LabelIcon from "@mui/icons-material/Label";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

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
  const { permissions } = usePermissions();
  return (
    <Menu
      sx={{
        marginTop: 0,
        "&.RaMenu-closed": {
          opacity: 0.8,
        },
      }}>
      <Menu.DashboardItem />
      <SubMenu
        handleToggle={() => handleToggle("menuCustomers")}
        isOpen={state.menuCustomers}
        name="Show panel"
        icon={<LabelIcon />}
        dense={dense}>
        <Menu.ResourceItem name="users" />
        <Menu.ResourceItem name="posts" />
      </SubMenu>

      {permissions.includes("admin") && (
        <SubMenu
          handleToggle={() => handleToggle("menuCustomers")}
          isOpen={state.menuCustomers}
          name="Admin panel"
          icon={<AdminPanelSettingsIcon />}
          dense={dense}>
          <Menu.ResourceItem name="admins" />
        </SubMenu>
      )}
      {permissions.includes("admin") && (
        <SubMenu
          handleToggle={() => handleToggle("menuCustomers")}
          isOpen={state.menuCustomers}
          name="Content panel"
          icon={<DynamicFeedIcon />}
          dense={dense}>
          <Menu.ResourceItem name="articles" />
        </SubMenu>
      )}
    </Menu>
  );
};
export default MyMenu;
