import axios from "axios";

const API_BASE_URL = "https://events-show.cyclic.app";

interface LoginParams {
  username: string;
  password: string;
}

const authProvider = {
  // Функція для аутентифікації користувача
  login: ({ username, password }: LoginParams) => {
    return axios
      .post(`${API_BASE_URL}/users/login`, { username, password })
      .then((response) => {
        // Якщо успішно, поверніть об'єкт користувача
        return response.data;
      })
      .catch((error) => {
        // Якщо сталася помилка, поверніть помилку аутентифікації
        throw new Error(
          error.response ? error.response.data.message : "Network Error"
        );
      });
  },

  // Функция для выхода пользователя из системы
  logout: () => {
    // Ваша логика выхода пользователя
    // Верните Promise, который разрешится успешно, если пользователь успешно вышел из системы,
    // и разрешится с ошибкой, если что-то пошло не так
    // return customLogoutFunction();
    // Пример: если у вас есть путь для выхода из системы, используйте его
    return axios
      .get(`${API_BASE_URL}/users/logout`)
      .then((response) => {
        // Если успешно, ничего не возвращаем
      })
      .catch((error) => {
        // Если произошла ошибка, верните ошибку выхода из системы
        console.log(error);
      });
  },

  // Функция для проверки авторизации пользователя перед отображением страницы или ресурса
  // checkAuth: () => {
  //   // Ваша логика проверки авторизации здесь
  //   // Верните Promise, который разрешится успешно, если пользователь авторизован,
  //   // и разрешится с ошибкой, если пользователь не авторизован
  //   // return customCheckAuthFunction();
  //   // Пример: если у вас есть путь для проверки авторизации, используйте его
  //   return axios
  //     .get(`${API_BASE_URL}/users/`)
  //     .then((response) => {
  //       // Если успешно, ничего не возвращаем
  //       return;
  //     })
  //     .catch((error) => {
  //       // Если произошла ошибка, верните ошибку проверки авторизации
  //       throw new Error(
  //         error.response ? error.response.data.message : "Network Error"
  //       );
  //     });
  // },

  // // ... (остальные методы authProvider)

  // // Функция для получения информации о текущем пользователе
  // getIdentity: () => {
  //   // Ваша логика получения информации о пользователе здесь
  //   // Верните Promise с объектом, представляющим текущего пользователя
  //   // return customGetIdentityFunction();
  //   // Пример: если у вас есть путь для получения информации о пользователе, используйте его
  //   return axios
  //     .get(`${API_BASE_URL}/users/me`)
  //     .then((response) => {
  //       // Если успешно, верните информацию о пользователе
  //       return response.data;
  //     })
  //     .catch((error) => {
  //       // Если произошла ошибка, верните ошибку получения информации о пользователе
  //       throw new Error(
  //         error.response ? error.response.data.message : "Network Error"
  //       );
  //     });
  // },
};

export default authProvider;
