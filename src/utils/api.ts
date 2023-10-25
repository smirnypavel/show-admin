import axios from "axios";

const API_BASE_URL = "https://events-show.cyclic.app/";

export const getUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  // Добавляем id к каждому пользователю в ответе
  const usersWithId = response.data.map((user: any) => ({
    ...user,
    id: user._id,
  }));
  return usersWithId;
};

export const getPosts = async () => {
  const response = await axios.get(`${API_BASE_URL}/orders/find`);
  // Добавляем id к каждому посту в ответе
  const postsWithId = response.data.map((post: any) => ({
    ...post,
    id: post._id,
  }));
  return postsWithId;
};

export const getUserById = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/find/${userId}`);
    if (response.data) {
      const usersWithId = { ...response.data, id: response.data._id };

      return usersWithId;
    }
    throw new Error("User not found"); // Опционально: выбросить ошибку, если пользователь не найден
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const getPostById = async (postId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/find/${postId}`);
    if (response.data) {
      const postsWithId = { ...response.data, id: response.data._id };

      return postsWithId;
    }
    throw new Error("Post not found"); // Опционально: выбросить ошибку, если пост не найден
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
};

// Другие функции для работы с API могут быть добавлены здесь
