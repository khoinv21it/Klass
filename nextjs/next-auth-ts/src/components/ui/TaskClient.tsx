"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface TasksData {
  id: string;
  title: string;
  description: string;
  status: string;
  start_date: string | null;
  due_date: string | null;
  priority: string;
  assignee_id: string;
}

const TasksClient = () => {
  //Lấy session từ client component
  const { data: session } = useSession();

  console.log("<<=== 🚀 TasksClient session ===>>", session);

  const [data, setData] = useState<TasksData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        /**
         * Có thể sử dụng access token từ session để gọi Backend API.
         * Ví dụ: const token = session?.user.accessToken;
         * const res = await fetch('https://server.aptech.io/workspaces/tasks', {
            headers: {
                Authorization: `Bearer session?.user.accessToken`,
            },
            });

         * Tuy nhiên cách này làm lộ access token trong trình duyệt.
         * Nên sử dụng server-side rendering hoặc API route để bảo mật hơn.
         */
        const res = await fetch("/api/tasks");
        /**
         * Gọi trung gian qua Router Handler ==> app\api\tasks\route.ts
         * Router Hanlder lấy token từ session sau đó gọi đến Backend API
         */
        if (!res.ok) throw new Error("Lỗi khi lấy dữ liệu task");
        const task = await res.json();
        setData(task.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Lỗi không xác định");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, []);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!data) return <div>Không có dữ liệu</div>;
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead>
          <tr className="bg-blue-100 text-blue-700">
            <th className="px-4 py-2 text-left">Tiêu đề</th>
            <th className="px-4 py-2 text-left">Trạng thái</th>
            <th className="px-4 py-2 text-left">Ngày bắt đầu</th>
            <th className="px-4 py-2 text-left">Ngày kết thúc</th>
            <th className="px-4 py-2 text-left">Mức độ ưu tiên</th>
            <th className="px-4 py-2 text-left">Người thực hiện</th>
          </tr>
        </thead>
        <tbody>
          {data.map((task: TasksData) => (
            <tr key={task.id} className="border-b hover:bg-blue-50">
              <td className="px-4 py-2">{task.title}</td>
              <td className="px-4 py-2">{task.status}</td>
              <td className="px-4 py-2">
                {task.start_date
                  ? new Date(task.start_date).toLocaleDateString()
                  : ""}
              </td>
              <td className="px-4 py-2">
                {task.due_date
                  ? new Date(task.due_date).toLocaleDateString()
                  : ""}
              </td>
              <td className="px-4 py-2 capitalize">{task.priority}</td>
              <td className="px-4 py-2">{task.assignee_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TasksClient;
