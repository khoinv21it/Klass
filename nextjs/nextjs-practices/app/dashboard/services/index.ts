

// Chỉ import js-cookie ở client, không dùng cho server

import { Task } from "@/app/lesson12/(afternoon)/types";

const baseUrl = "https://server.aptech.io";

export function getDefaultHeaders(token?: string) {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export const login = async (username: string, password: string) => {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: getDefaultHeaders(), // login không cần token
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

export async function getTasks(token?: string) {
  const res = await fetch("https://server.aptech.io/workspaces/tasks", {
    headers: getDefaultHeaders(token),
    // cache: 'no-store',
  });
  return await res.json();
}

export const getTaskById = async (id: string, token?: string) => {
  const response = await fetch(`${baseUrl}/workspaces/tasks/${id}`, {
    headers: getDefaultHeaders(token),
  });
  return response.json();
};

export const updateTask = async (id: number, task: Task, token?: string) => {
  const response = await fetch(`${baseUrl}/workspaces/tasks/${id}`, {
    method: 'PATCH',
    headers: getDefaultHeaders(token),
    body: JSON.stringify(task),
  });
  return response.json();
}