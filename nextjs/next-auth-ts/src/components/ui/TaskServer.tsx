import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

interface TasksData {
  id: number;
  title: string;
  status: string;
  start_date: string | null;
  due_date: string | null;
  priority: string;
  assignee_id: number | null;
}

const TaskServer = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return (
      <div>
        <h1>You are not logged in</h1>
      </div>
    );
  }
  //Gọi API trong server component
  const response = await fetch("https://server.aptech.io/workspaces/tasks", {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });
  if (!response.ok) {
    return "Error fetching profile data";
  }
  const tasks = await response.json();
  console.log("data tasks", tasks);

  return (
    <div className="overflow-x-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Danh sách Task</h1>
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
          {tasks.map((task: TasksData) => (
            <tr key={task.id} className="border-b hover:bg-blue-50">
              <td className="px-4 py-2">{task.title}</td>
              <td className="px-4 py-2">{task.status}</td>
              <td className="px-4 py-2">{task.start_date ? new Date(task.start_date).toLocaleDateString() : ""}</td>
              <td className="px-4 py-2">{task.due_date ? new Date(task.due_date).toLocaleDateString() : ""}</td>
              <td className="px-4 py-2 capitalize">{task.priority}</td>
              <td className="px-4 py-2">{task.assignee_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskServer;
