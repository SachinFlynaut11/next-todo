import type { Todo } from "@/types/todo";
import { getServerToken } from "@/lib/auth-server";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function authFetch(path: string, options: RequestInit = {}) {
  const token = await getServerToken();

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    cache: "no-store",
  });

  return res;
}

export async function fetchTodos(): Promise<Todo[]> {
  const res = await authFetch("/api/todos");

  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }

  return res.json();
}

export async function loginApi(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data as { token: string; user: { _id: string; name: string; email: string } };
}

export async function registerApi(
  name: string,
  email: string,
  password: string
) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
}

export async function createTodoApi(title: string) {
  const res = await authFetch("/api/todos", {
    method: "POST",
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    throw new Error("Failed to create todo");
  }

  return res.json();
}

export async function updateTodoApi(id: string, title: string) {
  const res = await authFetch(`/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    throw new Error("Failed to update todo");
  }

  return res.json();
}

export async function deleteTodoApi(id: string) {
  const res = await authFetch(`/api/todos/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete todo");
  }
}

export async function fetchTodoById(id: string): Promise<Todo | null> {
  const todos = await fetchTodos();
  return todos.find((t) => t._id === id) ?? null;
}
