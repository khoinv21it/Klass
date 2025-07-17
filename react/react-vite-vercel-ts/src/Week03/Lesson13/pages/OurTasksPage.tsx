import { useEffect, useState } from "react";
import type { Task } from "../types";
import { Link, useNavigate } from "react-router";
import { Table, Tag, Button } from "antd";
import { AuthBtn } from "../components/AuthBtn";
import SearchTasks from "../components/SearchTask";
import { useAuthStore } from "../useAuthStore";
import { apiClient } from "../libraries/api-client";
import React from "react";

export default function OurTasksPage() {
  const { loggedInUser } = useAuthStore((state) => state);
  const [tasks, setTasks] = React.useState<any[]>([]);
  const navigate = useNavigate();

  const [filters, setFilters] = useState<any>({
    status: "",
    priority: "",
    title: "",
  });

  // useEffect(()=>{
  //   if(!loggedInUser) {
  //     navigate('/lesson13/login');
  //   }
  // }, [loggedInUser, navigate])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = (await apiClient.get("/workspaces/tasks")) as any[];
        console.log(tasks);
        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
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
        <AuthBtn>
          <Link to={`/lesson13/update-task/${record.id}`}>
            <Button type="link">Edit</Button>
          </Link>
        </AuthBtn>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <SearchTasks onSearch={handleOnSearch} />
      <Table
        columns={columns}
        dataSource={filteredTasks}
        rowKey="id"
        bordered
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
}
