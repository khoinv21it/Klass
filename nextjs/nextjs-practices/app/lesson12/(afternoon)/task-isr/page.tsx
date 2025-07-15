import React from "react";
import { Task } from "../types";

export default function TaskISR() {
  return <TaskList tasks={[]} />;
}

function TaskList({ tasks }: { tasks: Task[] }) {
  if (!tasks.length) return <div>No tasks found.</div>;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow text-sm">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-3 py-2 border-b">ID</th>
            <th className="px-3 py-2 border-b">Title</th>
            <th className="px-3 py-2 border-b">Description</th>
            <th className="px-3 py-2 border-b">Start Date</th>
            <th className="px-3 py-2 border-b">Due Date</th>
            <th className="px-3 py-2 border-b">Status</th>
            <th className="px-3 py-2 border-b">Completed Date</th>
            <th className="px-3 py-2 border-b">Priority</th>
            <th className="px-3 py-2 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="even:bg-blue-50 hover:bg-blue-200/40 transition"
            >
              <td className="px-3 py-2 border-b text-center">{task.id}</td>
              <td className="px-3 py-2 border-b font-semibold">{task.title}</td>
              <td className="px-3 py-2 border-b">{task.description || ""}</td>
              <td className="px-3 py-2 border-b text-center">
                {task.start_date
                  ? new Date(task.start_date).toLocaleDateString()
                  : ""}
              </td>
              <td className="px-3 py-2 border-b text-center">
                {task.due_date
                  ? new Date(task.due_date).toLocaleDateString()
                  : ""}
              </td>
              <td className="px-3 py-2 border-b text-center">
                <span
                  className={
                    task.status === "done"
                      ? "text-green-600 font-bold"
                      : task.status === "in_progress"
                      ? "text-yellow-600 font-bold"
                      : "text-gray-600 font-bold"
                  }
                >
                  {task.status.replace(/_/g, " ")}
                </span>
              </td>
              <td className="px-3 py-2 border-b text-center">
                {task.completed_date
                  ? new Date(task.completed_date).toLocaleDateString()
                  : ""}
              </td>
              <td className="px-3 py-2 border-b text-center">
                <span
                  className={
                    task.priority === "high"
                      ? "text-red-600 font-bold"
                      : task.priority === "medium"
                      ? "text-yellow-700 font-bold"
                      : "text-blue-600 font-bold"
                  }
                >
                  {task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1)}
                </span>
              </td>
              <td className="px-3 py-2 border-b text-center">
                <a
                  href={`/lesson12/task-isr/${task.id}`}
                  className="inline-block px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition font-semibold"
                >
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
