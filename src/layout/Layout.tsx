import * as React from "react";
import { Layout, LayoutProps } from "react-admin";
import { MyAppBar } from "./MyAppBar";
import MyMenu from "./Menu";

const MyLayout = (props: LayoutProps) => (
  <Layout
    {...props}
    appBar={MyAppBar}
    menu={MyMenu}
  />
);

export default MyLayout;
