
const baseUrl = "https://server.aptech.io";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const login = async (username: string, password: string) => {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

export async function getTasks() {
  // Dùng token cố định để test
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0dW5nbnRAc29mdGVjaC52biIsImVtYWlsIjoidHVuZ250QHNvZnRlY2gudm4iLCJzdWIiOjEsImFwcGxpY2F0aW9uIjoiT25saW5lIFNob3AgLSBBUEkiLCJyb2xlcyI6W3siaWQiOjEsIm5hbWUiOiJBZG1pbmlzdHJhdG9ycyJ9LHsiaWQiOjIsIm5hbWUiOiJNYW5hZ2VycyJ9XSwiaWF0IjoxNzUyNTY1NjQzLCJleHAiOjE3ODQxMjMyNDN9.ka0XeHQQrI2aOHMw_dreoj-2RGKTueVtwFsAjpLQm5M";

  const res = await fetch("https://server.aptech.io/workspaces/tasks", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    // cache: 'no-store',
  });
  return await res.json();
}

export const getTaskById = async (id: string) => {
  const response = await fetch(`${baseUrl}/workspaces/tasks/${id}`, {
    headers: defaultHeaders,
  });
  return response.json();
};