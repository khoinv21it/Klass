import React from "react";
import { getTasks } from "../../services";
import { Task } from "../../types";

export const revalidate = 60;
export const dynamic = "force-static";
export const dynamicParams = true; // Chỉ định rằng trang này sẽ không sử dụng các tham số động

export async function generateStaticParams() {
  const res = await getTasks();
  if (!res || !Array.isArray(res)) {
    return [];
  }

  return res.slice(0, 10).map((task: Task) => ({
    id: task.id?.toString(),
  }));
}

export default async function TaskDetail({ params }: { params: Promise<{ id: number }> }) {
  const { id } =  await params;
  const response = await fetch(
    `https://server.aptech.io/workspaces/tasks/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0dW5nbnRAc29mdGVjaC52biIsImVtYWlsIjoidHVuZ250QHNvZnRlY2gudm4iLCJzdWIiOjEsImFwcGxpY2F0aW9uIjoiT25saW5lIFNob3AgLSBBUEkiLCJyb2xlcyI6W3siaWQiOjEsIm5hbWUiOiJBZG1pbmlzdHJhdG9ycyJ9LHsiaWQiOjIsIm5hbWUiOiJNYW5hZ2VycyJ9XSwiaWF0IjoxNzUyNTY1NjQzLCJleHAiOjE3ODQxMjMyNDN9.ka0XeHQQrI2aOHMw_dreoj-2RGKTueVtwFsAjpLQm5M`,
      },
      next: {
        revalidate: 60,
        tags: [`task-${id}`],
      },
    }
  );
  const task: Task = await response.json();
  return (
    <div className="max-w-xl mx-auto bg-gradient-to-br from-blue-100 via-white to-blue-200 rounded-3xl shadow-2xl p-8 mt-10 border border-blue-200">
      <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center tracking-tight drop-shadow">
        Task Detail
      </h2>
      <div className="divide-y divide-blue-100">
        <div className="flex items-center py-3">
          <span className="w-40 font-semibold text-blue-600">ID:</span>
          <span className="ml-2 text-gray-700">{task.id}</span>
        </div>
        <div className="flex items-center py-3">
          <span className="w-40 font-semibold text-blue-600">Title:</span>
          <span className="ml-2 text-gray-800 font-bold text-lg">
            {task.title}
          </span>
        </div>
        <div className="flex items-center py-3">
          <span className="w-40 font-semibold text-blue-600">Description:</span>
          <span className="ml-2 text-gray-700">{task.description || ""}</span>
        </div>
        <div className="flex items-center py-3">
          <span className="w-40 font-semibold text-blue-600">Start Date:</span>
          <span className="ml-2 text-gray-700">
            {task.start_date
              ? new Date(task.start_date).toLocaleDateString()
              : ""}
          </span>
        </div>
        <div className="flex items-center py-3">
          <span className="w-40 font-semibold text-blue-600">Due Date:</span>
          <span className="ml-2 text-gray-700">
            {task.due_date ? new Date(task.due_date).toLocaleDateString() : ""}
          </span>
        </div>
        <div className="flex items-center py-3">
          <span className="w-40 font-semibold text-blue-600">Status:</span>
          <span className="ml-2">
            <span
              className={
                task.status === "done"
                  ? "bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold shadow"
                  : task.status === "in_progress"
                  ? "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-bold shadow"
                  : "bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-bold shadow"
              }
            >
              {task.status.replace(/_/g, " ")}
            </span>
          </span>
        </div>
        <div className="flex items-center py-3">
          <span className="w-40 font-semibold text-blue-600">
            Completed Date:
          </span>
          <span className="ml-2 text-gray-700">
            {task.completed_date
              ? new Date(task.completed_date).toLocaleDateString()
              : ""}
          </span>
        </div>
        <div className="flex items-center py-3">
          <span className="w-40 font-semibold text-blue-600">Priority:</span>
          <span className="ml-2">
            <span
              className={
                task.priority === "high"
                  ? "bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold shadow"
                  : task.priority === "medium"
                  ? "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-bold shadow"
                  : "bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold shadow"
              }
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
