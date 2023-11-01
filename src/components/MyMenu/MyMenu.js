import { Menu } from "react-admin";
import Badge from "@mui/material/Badge";
import LabelIcon from "@mui/icons-material/Label";

export const MyMenu = () => (
  <Menu
    sx={{
      marginTop: 0,
      "&.RaMenu-closed": {
        opacity: 0.8,
      },
    }}>
    <Menu.DashboardItem />
    <Menu.ResourceItems name="users" />
    {/* <Menu.ResourceItem name="posts" /> */}

    <Menu.Item
      to="/custom-route"
      primaryText="Miscellaneous"
      leftIcon={<LabelIcon />}>
      <Badge
        badgeContent={4}
        color="primary">
        Notifications
      </Badge>
    </Menu.Item>
  </Menu>
);
