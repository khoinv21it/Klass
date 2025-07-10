import { useEffect, useState } from "react";
import { getTasks } from "../services";
import type { Task } from "../types";
import { Link } from "react-router";
import SearchTasks from "../components/SearchTask";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Props = {};

export default function OurTasksPage({}: Props) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm state loading

  const [filters, setFilters] = useState<any>({
    status: "",
    priority: "",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const tasks = await getTasks();
        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleOnSearch = (filters: { status?: string; priority?: string }) => {
    setFilters(filters);
  };
  const filteredTasks = tasks.filter((task: Task) => {
    let matches = true;

    if (filters.status && task.status !== filters.status) {
      matches = false;
    }

    if (filters.priority && task.priority !== filters.priority) {
      matches = false;
    }

    return matches;
  });

  return (
    <div className="p-4">
      <SearchTasks onSearch={handleOnSearch} />
      <h2 className="text-2xl font-bold text-blue-600 mb-4">All Tasks</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                ID
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                Title
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                Description
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                Priority
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                Due Date
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                Assignee
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading
              ? Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx}>
                    {Array.from({ length: 8 }).map((_, colIdx) => (
                      <td className="px-4 py-2" key={colIdx}>
                        <Skeleton height={24} />
                      </td>
                    ))}
                  </tr>
                ))
              : filteredTasks.map((task: Task) => (
                  <tr key={task.id} className="hover:bg-blue-50 transition">
                    <td className="px-4 py-2">{task.id}</td>
                    <td className="px-4 py-2">{task.title}</td>
                    <td className="px-4 py-2">{task.description}</td>
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
                        {task.status
                          ? task.status.replace("_", " ")
                          : "No status"}
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
                    <td className="px-4 py-2">
                      {task.due_date
                        ? new Date(task.due_date).toLocaleDateString()
                        : ""}
                    </td>
                    <td className="px-4 py-2">
                      {task.assignee_id || "Unassigned"}
                    </td>
                    <td className="px-4 py-2">
                      <Link
                        to={`/lesson10/update-task/${task.id}`}
                        className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 font-medium transition"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
