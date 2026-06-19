import axiosInstance from "./axios";


// ---------------- AUTH ----------------

export const registerUser = async (
  data: {
    name: string;
    email: string;
    password: string;
  }
) => {
  const response =
    await axiosInstance.post(
      "/api/auth/register",
      data
    );

  return response.data;
};

export const loginUser = async (
  data: {
    email: string;
    password: string;
  }
) => {
  const response =
    await axiosInstance.post(
      "/api/auth/login",
      data
    );

  return response.data;
};


// ---------------- TODOS ----------------

export const getTodos = async () => {
  const response =
    await axiosInstance.get(
      "/api/todos"
    );

  return response.data;
};

export const createTodo = async (
  title: string
) => {
  const response =
    await axiosInstance.post(
      "/api/todos",
      { title }
    );

  return response.data;
};

export const updateTodo = async (
  id: string,
  data: {
    title?: string;
    completed?: boolean;
  }
) => {
  const response =
    await axiosInstance.put(
      `/api/todos/${id}`,
      data
    );

  return response.data;
};

export const deleteTodo = async (
  id: string
) => {
  const response =
    await axiosInstance.delete(
      `/api/todos/${id}`
    );

  return response.data;
};