import React from "react";
import { Admin, Resource, EditGuesser, ShowGuesser, Layout } from "react-admin";
import dataProvider from "../utils/dataProvider";
import { PostList } from "@/components/Guessers/CastomPostList";
import { CustomUserList } from "@/components/Guessers/UserList";
import { UserEdit } from "@/components/Guessers/UserEdit";
import { UserShow } from "@/components/Guessers/ShowUser/ShowUser";
import myAuthProvider from "@/utils/authProvider";
import Dashboard from "@/Dashboard";
import { MyAppBar } from "@/MyAppBar";

const MyLayout = (props) => (
  <Layout
    {...props}
    appBar={MyAppBar}
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
      />
      <Resource
        name="posts"
        list={PostList}
        show={ShowGuesser}
        edit={EditGuesser}
      />

      {/* Другие ресурсы могут быть добавлены здесь */}
    </Admin>
  );
};

export default AdminApp;
