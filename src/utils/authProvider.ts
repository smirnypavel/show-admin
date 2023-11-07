import { IAdmin } from "@/types/IAuth";
import axios from "axios";
import { AuthProvider, UserIdentity } from "react-admin";
// import { UserIdentity } from "ra-core";

const API_BASE_URL = "https://events-4qv2.onrender.com";

let userData: IAdmin | null = null; // Переменная для хранения данных пользователя
const myAuthProvider: AuthProvider = {
  initInterceptor: () => {
    // Добавляем Interceptor для обработки ошибок 401
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // Проверяем, если ошибка 401
        if (error.response && error.response.status === 401) {
          // Пытаемся обновить токен
          return myAuthProvider
            .refreshAccessToken()
            .then((newToken: string) => {
              // Если обновление токена успешно, повторяем запрос
              const originalRequest = error.config;
              if (newToken) {
                originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
              }

              return axios(originalRequest);
            });
        }
        return Promise.reject(error);
      }
    );
  },
  login: ({ username, password }: { username: string; password: string }) => {
    return axios
      .post(`${API_BASE_URL}/admin/login`, { username, password })
      .then((response) => {
        if (response.status === 200) {
          const { token } = response.data;
          userData = response.data;
          localStorage.setItem("auth", JSON.stringify({ ...userData }));
          // Добавляем токен к заголовкам Axios
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          throw new Error("Ошибка аутентификации");
        }
      });
  },
  logout: () => {
    const authData: IAdmin | null = JSON.parse(
      localStorage.getItem("auth") || "null"
    );
    if (authData && authData.token) {
      const { token } = authData;
      return axios
        .post(
          `${API_BASE_URL}/admin/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          localStorage.removeItem("auth");
        });
    } else {
      return Promise.resolve();
    }
  },
  checkAuth: () => {
    return localStorage.getItem("auth") ? Promise.resolve() : Promise.reject();
  },
  checkError: (error: any) => {
    const status = error.response ? error.response.status : null;
    if (status === 401 || status === 403) {
      localStorage.removeItem("auth");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // getPermissions: () => {
  //   return Promise.resolve(); // Разрешения для всех пользователей
  // },
  getPermissions: () => {
    // Получаем информацию о пользователе из localStorage или из другого места,
    // где вы сохраняете данные пользователя после успешной аутентификации
    const authData: IAdmin | null = JSON.parse(
      localStorage.getItem("auth") || "null"
    );

    const userRole = authData?.role; // Получаем роль пользователя из объекта пользователя
    console.log(userRole, "role");
    // Определяем разрешения в зависимости от роли пользователя
    if (userRole === "superadmin") {
      return Promise.resolve(["read", "write", "admin"]);
    }
    if (userRole === "admin") {
      return Promise.resolve(["read"]);
    }
    if (userRole === "moderator") {
      return Promise.resolve(["read"]);
    }

    // Если роль неизвестна или не указана, можно вернуть пустой массив разрешений или выбросить ошибку
    // return Promise.resolve([]);
    return Promise.reject(new Error("Неизвестная роль пользователя"));
  },
  refreshAccessToken: () => {
    const authData: IAdmin | null = JSON.parse(
      localStorage.getItem("auth") || "null"
    );
    if (authData && authData.token) {
      const { token } = authData;
      return axios
        .patch(
          `${API_BASE_URL}/admin/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          localStorage.setItem("auth", JSON.stringify(response.data));
          const newToken = response.data.token;
          axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
          return newToken; // Возвращаем новый токен
        });
    } else {
      return Promise.reject(
        new Error("Не удалось получить данные аутентификации")
      );
    }
  },
  getIdentity: (): Promise<UserIdentity> => {
    if (userData) {
      // If there are user data, return them
      return Promise.resolve({
        id: userData._id,
        fullName: userData.username,
        avatar: userData.avatar,
        // ... other user properties
      });
    } else {
      // If there is no user data, handle the error case appropriately
      return Promise.reject(new Error("User data not available"));
    }
  },
};

export default myAuthProvider;
