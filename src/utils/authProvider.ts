import { IUserAuth } from "@/types/IAuth";
import axios from "axios";

const API_BASE_URL = "https://events-4qv2.onrender.com";

const myAuthProvider = {
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
          return myAuthProvider.refreshAccessToken().then((newToken) => {
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
      .post(`${API_BASE_URL}/users/login`, { email: username, password })
      .then((response) => {
        if (response.status === 200) {
          const { token } = response.data;
          localStorage.setItem("auth", JSON.stringify({ token }));
          // Добавляем токен к заголовкам Axios
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          throw new Error("Ошибка аутентификации");
        }
      });
  },
  logout: () => {
    const authData: IUserAuth | null = JSON.parse(
      localStorage.getItem("auth") || "null"
    );
    console.log(authData);
    if (authData && authData.token) {
      const { token } = authData;
      return axios
        .post(
          `${API_BASE_URL}/users/logout`,
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
  getPermissions: () => {
    return Promise.resolve(); // Разрешения для всех пользователей
  },
  refreshAccessToken: () => {
    const authData: IUserAuth | null = JSON.parse(
      localStorage.getItem("auth") || "null"
    );
    if (authData && authData.token) {
      const { token } = authData;
      return axios
        .post(
          `${API_BASE_URL}/users/refresh`,
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
};

export default myAuthProvider;
