import { useEffect, useState } from "react";
import { useAuthStore } from "../useAuthStore";
import { apiClient } from "../libraries/api-client";
import type { Task } from "../types";
import { Table, Tag } from "antd";

export default function MyTasksPage() {
  const { loggedInUser } = useAuthStore((state) => state);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await apiClient.get(`/workspaces/tasks?assignee_id=${loggedInUser?.id}`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    if (loggedInUser) {
      fetchTasks();
    }
  }, [loggedInUser]);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "to_do"
              ? "default"
              : status === "in_progress"
              ? "gold"
              : status === "done"
              ? "green"
              : "red"
          }
        >
          {status ? status.replace("_", " ") : "No status"}
        </Tag>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority: string) => (
        <Tag
          color={
            priority === "low"
              ? "blue"
              : priority === "medium"
              ? "orange"
              : priority === "high"
              ? "red"
              : "default"
          }
        >
          {priority ? priority : "No priority"}
        </Tag>
      ),
    },
    { title: "Assignee", dataIndex: "assignee_id", key: "assignee_id" },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Table
        columns={columns}
        dataSource={tasks}
        loading={loading}
        rowKey="id"
        bordered
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
}
