import React from "react";
import { Admin, Resource, EditGuesser, ShowGuesser, Layout } from "react-admin";
import dataProvider from "../utils/dataProvider";
import { PostList } from "@/components/Guessers/CastomPostList";
import { CustomUserList } from "@/components/Guessers/UserList";
import { UserEdit } from "@/components/Guessers/UserEdit";
import { UserShow } from "@/components/Guessers/ShowUser/ShowUser";
import { PostShow } from "@/components/Guessers/PostShow/PostShow";
import myAuthProvider from "@/utils/authProvider";
import Dashboard from "@/Dashboard";
import { MyAppBar } from "@/MyAppBar";
import PeopleIcon from "@mui/icons-material/People";
import BookIcon from "@mui/icons-material/Book";
// import MyLayout from "@/MyLayout/MyLayout";
import { MyMenu } from "@/components/MyMenu/MyMenu";

const MyLayout = (props) => (
  <Layout
    {...props}
    appBar={MyAppBar}
    menu={MyMenu}
  />
);
const AdminApp = () => {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={myAuthProvider}
      dashboard={Dashboard}
      layout={MyLayout}
      darkTheme={{ palette: { mode: "dark" } }}>
      <Resource
        name="users"
        list={CustomUserList}
        edit={UserEdit}
        show={UserShow}
        icon={PeopleIcon}
      />
      <Resource
        name="posts"
        list={PostList}
        show={PostShow}
        edit={EditGuesser}
        icon={BookIcon}
      />

      {/* Другие ресурсы могут быть добавлены здесь */}
    </Admin>
  );
};

export default AdminApp;
