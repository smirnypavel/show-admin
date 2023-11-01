import {
  AppBar,
  ToggleThemeButton,
  LocalesMenuButton,
  RefreshIconButton,
  TitlePortal,
} from "react-admin";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton } from "@mui/material";

const SettingsButton = () => (
  <IconButton color="inherit">
    <SettingsIcon />
  </IconButton>
);

export const MyAppBar = () => (
  <AppBar
    toolbar={
      <>
        <LocalesMenuButton />
        <ToggleThemeButton />
        <RefreshIconButton />
      </>
    }>
    {" "}
    <TitlePortal />
    <SettingsButton />
  </AppBar>
);
