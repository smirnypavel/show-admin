// import { IUserAuth } from "@/types/IAuth";
import {
  getUsers,
  getPosts,
  getUserById,
  getPostById,
  updateUser,
  createUser,
  getAdmins,
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

const dataProvider = {
  getList: async (resource: string, params: Params) => {
    try {
      let data: any[] = [];
      if (resource === "users") {
        data = await getUsers();
        // Apply filters based on firstName, lastName, and _id
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

        data = processUsers(data);
        data = addIdToData(data);

        return { data, total: data.length };
      } else if (resource === "posts") {
        data = await getPosts();
        if (Array.isArray(data)) {
          data = processPosts(data);
          data = addIdToData(data);
        } else {
          data = []; // если данные не являются массивом, вернем пустой массив
        }
      } else if (resource === "admins") {
        data = await getAdmins();
        // Примените фильтры, если они предоставлены в params.filter
        if (params.filter) {
          // Пример: фильтрация по имени администратора
          if (params.filter.name) {
            data = data.filter((admin) =>
              admin.name
                .toLowerCase()
                .includes(params.filter.name.toLowerCase())
            );
          }
          // Добавьте другие фильтры, если необходимо
        }

        data = processAdmins(data);
        data = addIdToData(data);

        return { data, total: data.length };
      }
      return { data, total: data.length };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { data: [], total: 0, error: "Failed to fetch data" };
    }
  },
  getOne: async (resource: string, params: Params) => {
    console.log(params.id, "1first");

    try {
      if (resource === "users" && params.id) {
        const user = await getUserById(params.id);
        // Обработайте вложенные объекты, если необходимо
        // console.log(user, "user");
        return { data: user };
      } else if (resource === "posts" && params.id) {
        const post = await getPostById(params.id);
        // Обработайте вложенные объекты, если необходимо
        return { data: post };
      }
      return { data: null };
    } catch (error) {
      console.error("Error fetching single item:", error);
      return { data: null, error: "Failed to fetch item" };
    }
  },
  getMany: async (resource: string, params: { ids: string[] }) => {
    try {
      if (resource === "users") {
        const users = await Promise.all(
          params.ids.map((id) => getUserById(id))
        );
        const processedUsers = processUsers(users);
        const usersWithId = addIdToData(processedUsers);
        return { data: usersWithId };
      }
      // Аналогично для других ресурсов, если необходимо
      return { data: [] };
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
    }
    // Добавьте обработку для других ресурсов, если необходимо
    return { error: "Invalid resource" };
  },
  create: async (resource: string, params: any) => {
    console.log("Create function is called");
    console.log(params);
    if (resource === "admins" && params.data) {
      try {
        console.log("Trying to create user"); // Добавьте эту строку
        // Вызываем функцию для создания пользователя
        const createdUser = await createUser(params.data);
        console.log(createdUser, "ответ от бека");
        // Проверьте, что createdUser содержит созданные данные пользователя
        return { data: createdUser }; // Убедитесь, что возвращается объект с ключом 'data'
      } catch (error) {
        console.error("Error creating user:", error);
        return { error: "Failed to create user" };
      }
    }
    // Добавьте обработку для других ресурсов, если необходимо
    return { error: "Invalid resource" }; // Обязательно возвращайте объект с ключом 'error', если ресурс недопустим
  },

  // Другие методы dataProvider могут быть добавлены здесь
};

export default dataProvider;
