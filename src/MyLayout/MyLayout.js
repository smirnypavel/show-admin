// in src/MyLayout.js
import { Layout } from "react-admin";

import { MyMenu } from "../components/MyMenu/MyMenu`";

const MyLayout = (props) => (
  <Layout
    {...props}
    menu={MyMenu}
  />
);
export default MyLayout;
