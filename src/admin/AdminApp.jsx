import React from "react";
import {
  Admin,
  ListGuesser,
  Resource,
  localStorageStore,
  useStore,
  ShowGuesser,
} from "react-admin";
import dataProvider from "@/utils/dataProvider";
import actors from "@/actors";
import posts from "@/post";
import myAuthProvider from "@/utils/authProvider";
import Dashboard from "@/dashboard/MyDashboard";
import { MyLayout, Login } from "@/layout";
import { themes } from "@/themes/themes";
import { AppThemeName } from "@/themes/themes";
import UserCreate from "./UserCreate";
import AdminsList from "@/admin/AdminList";
import { AdminShow } from "./AdminShow";
import ArticleIcon from "@mui/icons-material/Article";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { ArticleList } from "@/article/ArticleList";
import ArticleCreate from "@/article/ArticleCreate";
import { ArticleShow } from "@/article/ArticleShow";

const AdminApp = () => {
  const storeValue = useStore < AppThemeName > ("themeName", "soft");

  const themeName = storeValue ? storeValue : "soft";
  const lightTheme = themes.find((theme) => theme.name === themeName)?.light;
  const darkTheme = themes.find((theme) => theme.name === themeName)?.dark;
  const store = localStorageStore(undefined, "ECommerce");

  return (
    <Admin
      store={store}
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
        {...posts}
      />
      <Resource
        name="admins"
        create={UserCreate}
        list={AdminsList}
        icon={SupervisorAccountIcon}
        show={AdminShow}
        permissions={myAuthProvider.getPermissions}
      />
      <Resource
        name="articles"
        create={ArticleCreate}
        list={ArticleList}
        icon={ArticleIcon}
        show={ArticleShow}
        permissions={myAuthProvider.getPermissions}
      />
      {/* Другие ресурсы могут быть добавлены здесь */}
    </Admin>
  );
};

export default AdminApp;
