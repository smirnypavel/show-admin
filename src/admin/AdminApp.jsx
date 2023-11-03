import React from "react";
import {
  Admin,
  Resource,
  EditGuesser,
  localStorageStore,
  useStore,
} from "react-admin";
import dataProvider from "../utils/dataProvider";
import { PostList } from "@/components/Guessers/CastomPostList";
import { CustomUserList } from "@/components/Guessers/UserList";
import { UserEdit } from "@/components/Guessers/UserEdit";
import { UserShow } from "@/components/Guessers/ShowUser/ShowUser";
import { PostShow } from "@/components/Guessers/PostShow/PostShow";
import myAuthProvider from "@/utils/authProvider";
import Dashboard from "@/dashboard/MyDashboard";
import PeopleIcon from "@mui/icons-material/People";
import BookIcon from "@mui/icons-material/Book";
import { MyLayout, Login } from "@/layout";
import { themes, ThemeName } from "@/themes/themes";

const AdminApp = () => {
  const storeValue = useStore < ThemeName > ("themeName", "soft");
  const themeName = storeValue ? storeValue : "soft";
  const lightTheme = themes.find((theme) => theme.name === themeName)?.light;
  const darkTheme = themes.find((theme) => theme.name === themeName)?.dark;
  const store = localStorageStore(undefined, "ECommerce");

  return (
    <Admin
      store={store}
      dataProvider={dataProvider}
      authProvider={myAuthProvider}
      dashboard={Dashboard}
      layout={MyLayout}
      loginPage={Login}
      disableTelemetry
      lightTheme={lightTheme}
      darkTheme={darkTheme}
      defaultTheme="light">
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
