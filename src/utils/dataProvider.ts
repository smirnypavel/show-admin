// import { IUserAuth } from "@/types/IAuth";
import { getUsers, getPosts, getUserById, getPostById } from "./api";

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

  // Другие методы dataProvider могут быть добавлены здесь
};

export default dataProvider;
