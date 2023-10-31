import axios from "axios";

const API_BASE_URL = "https://events-4qv2.onrender.com";

const myAuthProvider = {
  login: ({ username, password }: { username: string; password: string }) => {
    return axios
      .post(`${API_BASE_URL}/users/login`, { email: username, password })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("auth", JSON.stringify(response.data));
        } else {
          throw new Error("Ошибка аутентификации");
        }
      });
  },
  logout: () => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      const { token } = JSON.parse(authData);
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
    const authData = localStorage.getItem("auth");
    if (authData) {
      const { token } = JSON.parse(authData);
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
        });
    } else {
      return Promise.reject(
        new Error("Не удалось получить данные аутентификации")
      );
    }
  },
};

export default myAuthProvider;
