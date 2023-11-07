import React from "react";
import {
  Admin,
  Resource,
  EditGuesser,
  localStorageStore,
  useStore,
  ShowGuesser,
} from "react-admin";
import dataProvider from "../utils/dataProvider";
import { PostList } from "@/components/Guessers/CastomPostList";
import actors from "@/actors";
import { PostShow } from "@/components/Guessers/PostShow/PostShow";
import myAuthProvider from "@/utils/authProvider";
import Dashboard from "@/dashboard/MyDashboard";
import BookIcon from "@mui/icons-material/Book";
import { MyLayout, Login } from "@/layout";
import { themes, ThemeName } from "@/themes/themes";
import UserCreate from "./UserCreate";
import AdminsList from "@/admin/AdminList";

const AdminApp = () => {
  const storeValue = useStore < ThemeName > ("themeName", "soft");
  const themeName = storeValue ? storeValue : "soft";
  const lightTheme = themes.find((theme) => theme.name === themeName)?.light;
  const darkTheme = themes.find((theme) => theme.name === themeName)?.dark;
  const store = localStorageStore(undefined, "ECommerce");

  return (
    <Admin
      requireAuth
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
        {...actors}
      />
      <Resource
        name="posts"
        list={PostList}
        show={PostShow}
        edit={EditGuesser}
        icon={BookIcon}
        // create={UserCreate}
        // create={CreateGuesser}
      />
      <Resource
        name="admins"
        create={UserCreate}
        list={AdminsList}
        icon={BookIcon}
        show={ShowGuesser}
        permissions={myAuthProvider.getPermissions}
        recordRepresentation={(record) =>
          `${record.first_name} ${record.last_name}`
        }
      />
      {/* Другие ресурсы могут быть добавлены здесь */}
    </Admin>
  );
};

export default AdminApp;
