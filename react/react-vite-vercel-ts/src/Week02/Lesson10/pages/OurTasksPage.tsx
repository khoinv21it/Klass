import { useEffect, useState } from "react";
import { getTasks } from "../services";
import type { Task } from "../types";
import { Link } from "react-router";
import { Table, Tag, Button } from "antd";
import SearchTasks from "../components/SearchTask";

type Props = {};

export default function OurTasksPage({}: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<any>({
    status: "",
    priority: "",
    title: "",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const tasks = await getTasks();
        // console.log("Fetched tasks:", tasks);
        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleOnSearch = (filters: {
    status?: string;
    priority?: string;
    title?: string;
  }) => {
    setFilters(filters);
  };

  const filteredTasks = tasks.filter((task: Task) => {
    let matches = true;
    if (filters.status && task.status !== filters.status) matches = false;
    if (filters.priority && task.priority !== filters.priority) matches = false;
    if (
      filters.title &&
      !task.title.toLowerCase().includes(filters.title.toLowerCase())
    )
      matches = false;
    return matches;
  });

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
    {
      title: "Due Date",
      dataIndex: "due_date",
      key: "due_date",
      render: (date: string) =>
        date ? new Date(date).toLocaleDateString() : "",
    },
    { title: "Assignee", dataIndex: "assignee_id", key: "assignee_id" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Task) => (
        <Link to={`/lesson10/update-task/${record.id}`}>
          <Button type="link">Edit</Button>
        </Link>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <SearchTasks onSearch={handleOnSearch} />
      <Table
        columns={columns}
        dataSource={filteredTasks}
        loading={loading}
        rowKey="id"
        bordered
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
}
