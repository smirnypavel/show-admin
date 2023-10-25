import React from "react";
import { Admin, Resource, EditGuesser, ShowGuesser } from "react-admin";
import dataProvider from "../utils/dataProvider";
import { PostList } from "@/components/Guessers/CastomPostList";
import { CustomUserList } from "@/components/Guessers/UserList";
import { UserEdit } from "@/components/Guessers/UserEdit";
import { UserShow } from "@/components/Guessers/ShowUser";

const AdminApp = () => {
  return (
    <Admin dataProvider={dataProvider}>
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
        // edit={EditGuesser}
      />

      {/* Другие ресурсы могут быть добавлены здесь */}
    </Admin>
  );
};

export default AdminApp;
