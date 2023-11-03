import * as React from "react";
import { Layout, LayoutProps } from "react-admin";
import { MyAppBar } from "./MyAppBar";
import MyMenu from "./Menu";
import CustomAppBar from "./AppBar";

const MyLayout = (props: LayoutProps) => (
  <Layout
    {...props}
    appBar={CustomAppBar}
    menu={MyMenu}
  />
);

export default MyLayout;
