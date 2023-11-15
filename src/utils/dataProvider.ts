// import { IUserAuth } from "@/types/IAuth";
import {
  getUsers,
  getPosts,
  getUserById,
  getPostById,
  updateUser,
  createAdmin,
  getAdmins,
  getAdminById,
  deleteUsersById,
  deletePostById,
  deleteAdminById,
  getArticleById,
  getArticle,
  updateArticle,
  createArticle,
  deleteArticlesById,
} from "./api";

interface Params {
  id: string;
  pagination: any;
  sort: any;
  filter: any;
  phone: string | number;
}

const addIdToData = (data: any[]) => {
  return data.map((item) => {
    return {
      ...item,
      id: item._id || null, // добавляем id только если _id существует, иначе id будет null
    };
  });
};

const processUsers = (users: any[]) => {
  return users.map((user) => {
    if (user) {
      // Проверяем, что пользователь существует
      // Обработайте вложенные объекты, если необходимо
      return user;
    }
    return null; // возвращаем null для несуществующего пользователя
  });
};

const processPosts = (posts: any[]) => {
  return posts.map((post) => {
    // Обработайте вложенные объекты, если необходимо
    return post;
  });
};
const processAdmins = (admins: any[]) => {
  return admins.map((admin) => {
    // Обработайте вложенные объекты, если необходимо
    return admin;
  });
};
const processArticles = (articles: any[]) => {
  return articles.map((article) => {
    // Обработайте вложенные объекты, если необходимо
    return article;
  });
};

const dataProvider = {
  getList: async (resource: string, params: Params) => {
    try {
      let data: any[] = [];
      let total: number = 0;
      if (resource === "users") {
        data = await getUsers();
        if (params.filter) {
          if (params.filter.firstName) {
            data = data.filter((user) =>
              user.firstName
                .toLowerCase()
                .includes(params.filter.firstName.toLowerCase())
            );
          }
          if (params.filter.lastName) {
            data = data.filter((user) =>
              user.lastName
                .toLowerCase()
                .includes(params.filter.lastName.toLowerCase())
            );
          }
          if (params.filter._id) {
            data = data.filter((user) => user._id === params.filter._id);
          }
        }
        total = data.length;
        data = processUsers(data);
        data = addIdToData(data);
      } else if (resource === "posts") {
        data = await getPosts();
        if (Array.isArray(data)) {
          data = processPosts(data);
          data = addIdToData(data);
        } else {
          data = [];
        }
        total = data.length;
      } else if (resource === "admins") {
        data = await getAdmins();
        if (params.filter) {
          if (params.filter.name) {
            data = data.filter((admin) =>
              admin.name
                .toLowerCase()
                .includes(params.filter.name.toLowerCase())
            );
          }
        }
        total = data.length;
        data = processAdmins(data);
        data = addIdToData(data);
      } else if (resource === "articles") {
        data = await getArticle();
        if (params.filter) {
          if (params.filter.name) {
            data = data.filter((article) =>
              article.name
                .toLowerCase()
                .includes(params.filter.name.toLowerCase())
            );
          }
        }
        total = data.length;
        data = processArticles(data);
        data = addIdToData(data);
      }

      return { data, total };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { data: [], total: 0, error: "Failed to fetch data" };
    }
  },

  getOne: async (resource: string, params: Params) => {
    try {
      let data = null;
      if (resource === "users" && params.id) {
        data = await getUserById(params.id);
      } else if (resource === "posts" && params.id) {
        data = await getPostById(params.id);
      } else if (resource === "admins" && params.id) {
        data = await getAdminById(params.id);
      } else if (resource === "articles" && params.id) {
        data = await getArticleById(params.id);
      }
      // Обработайте вложенные объекты, если необходимо
      if (data !== null) {
        return { data };
      } else {
        return { data: null, error: "Item not found" };
      }
    } catch (error) {
      console.error("Error fetching single item:", error);
      return { data: null, error: "Failed to fetch item" };
    }
  },

  getMany: async (resource: string, params: { ids: string[] }) => {
    try {
      let data = [];
      if (resource === "users") {
        const users = await Promise.all(
          params.ids.map((id) => getUserById(id))
        );
        const processedUsers = processUsers(users);
        const usersWithId = addIdToData(processedUsers);
        data = usersWithId;
      } else if (resource === "posts") {
        const posts = await Promise.all(
          params.ids.map((id) => getPostById(id))
        );
        data = posts;
      } else if (resource === "admins") {
        const admins = await Promise.all(
          params.ids.map((id) => getAdminById(id))
        );
        data = admins;
      } else if (resource === "articles") {
        const articles = await Promise.all(
          params.ids.map((id) => getArticleById(id))
        );
        data = articles;
      }
      // Аналогично для других ресурсов, если необходимо
      return { data };
    } catch (error) {
      console.error("Error fetching multiple items:", error);
      return { data: [], error: "Failed to fetch items" };
    }
  },

  update: async (resource: string, params: any) => {
    if (resource === "users" && params.data) {
      try {
        const updatedUser = await updateUser(params.id, params.data);
        return { data: updatedUser };
      } catch (error) {
        console.error("Error updating user:", error);
        return { error: "Failed to update user" };
      }
    } else if (resource === "articles" && params.data) {
      try {
        const updatedArticle = await updateArticle(params.id, params.data);
        return { data: updatedArticle };
      } catch (error) {
        console.error("Error updating article:", error);
        return { error: "Failed to update article" };
      }
    }
    return { error: "Invalid resource" };
  },

  create: async (resource: string, params: any) => {
    if (resource === "admins" && params.data) {
      try {
        const createdAdmin = await createAdmin(params.data);
        return { data: createdAdmin };
      } catch (error) {
        console.error("Error creating user:", error);
        return { error: "Failed to create user" };
      }
    } else if (resource === "articles" && params.data) {
      try {
        const createdArticle = await createArticle(params.data);
        return { data: createdArticle };
      } catch (error) {
        console.error("Error creating article:", error);
        return { error: "Failed to create article" };
      }
    }
    // Добавьте обработку для других ресурсов, если необходимо
    return { error: "Invalid resource" };
  },

  deleteMany: async (resource: string, params: { ids: string[] }) => {
    if (resource === "users") {
      try {
        const deletedUsers = await deleteUsersById(params.ids);
        return { data: deletedUsers };
      } catch (error) {
        console.error("Error deleting users:", error);
        return { error: "Failed to delete users" };
      }
    } else if (resource === "posts") {
      try {
        const deletedPosts = await deletePostById(params.ids);
        return { data: deletedPosts };
      } catch (error) {
        console.error("Error deleting posts:", error);
        return { error: "Failed to delete posts" };
      }
    } else if (resource === "admins") {
      try {
        const deletedAdmins = await deleteAdminById(params.ids);
        return { data: deletedAdmins };
      } catch (error) {
        console.error("Error deleting admins:", error);
        return { error: "Failed to delete admins" };
      }
    } else if (resource === "articles") {
      try {
        const deletedArticles = await deleteArticlesById(params.ids);
        return { data: deletedArticles };
      } catch (error) {
        console.error("Error deleting admins:", error);
        return { error: "Failed to delete admins" };
      }
    }

    // Добавьте обработку для других ресурсов, если необходимо
    return { error: "Invalid resource" };
  },

  // Другие методы dataProvider могут быть добавлены здесь
};

export default dataProvider;
