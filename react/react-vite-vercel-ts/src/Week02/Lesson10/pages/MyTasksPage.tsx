import React, { useContext, useEffect } from "react";
import AuthContext from "../context";
import { getTasksByAssignee } from "../services";
import type { Task } from "../types";

type Props = {};

export default function MyTasksPage({}: Props) {
  const { user } = useContext(AuthContext);

  const [tasks, setTasks] = React.useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) return;
      try {
        const tasks = await getTasksByAssignee(user.id);
        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    if (user) {
      fetchTasks();
    }
  }, [user]);
  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assignee</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task: Task) => (
            <tr key={task.id} className="hover:bg-gray-100 transition-colors">
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td className="px-4 py-2">
                <span
                  className={
                    "px-2 py-1 rounded text-xs font-semibold " +
                    (task.status === "to_do"
                      ? "bg-gray-200 text-gray-800"
                      : task.status === "in_progress"
                      ? "bg-yellow-200 text-yellow-800"
                      : task.status === "done"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-100 text-red-800")
                  }
                >
                  {task.status ? task.status.replace("_", " ") : "No status"}
                </span>
              </td>
              <td className="px-4 py-2">
                <span
                  className={
                    "px-2 py-1 rounded text-xs font-semibold " +
                    (task.priority === "low"
                      ? "bg-blue-100 text-blue-800"
                      : task.priority === "medium"
                      ? "bg-orange-200 text-orange-800"
                      : task.priority === "high"
                      ? "bg-red-200 text-red-800"
                      : "bg-gray-100 text-gray-800")
                  }
                >
                  {task.priority ? task.priority : "No priority"}
                </span>
              </td>
              <td>{task.assignee_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
