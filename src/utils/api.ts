import axios from "axios";

// const API_BASE_URL = "https://events-show.cyclic.app/";
const API_BASE_URL = "https://events-4qv2.onrender.com";

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
export const updateUser = async (userId: string, userData: any) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/users/find-by-id/${userId}`,
      userData
    );
    if (response.data) {
      const updatedUserWithId = { ...response.data, id: response.data._id };
      return updatedUserWithId;
    }
    throw new Error("User not found");
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
};
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/category`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};

// Admin interface

export const getAdmins = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/find`);
    // Добавляем id к каждому пользователю в ответе
    const adminWithId = response.data.map((admin: any) => ({
      ...admin,
      id: admin._id,
    }));
    return adminWithId;
  } catch (error) {
    console.error("Error fetching admins:", error);
    throw new Error("Failed to fetch admins"); // Бросаем ошибку для обработки в вызывающем коде
  }
};

export const createUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin`, userData);
    if (response.data) {
      const createdUserWithId = { ...response.data, id: response.data._id };

      console.log(createdUserWithId);
      return createdUserWithId; // Оборачиваем созданного пользователя в объект с ключом data
    }
    throw new Error("Failed to create user");
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: "Failed to create user" }; // Возвращаем ошибку в нужном формате, если создание пользователя не удалось
  }
};

// Другие функции для работы с API могут быть добавлены здесь
