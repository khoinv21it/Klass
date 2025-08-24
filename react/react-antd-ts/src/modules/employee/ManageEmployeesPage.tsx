import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Table, Button, Space, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { IEmployee } from "./employee.type";
import {
  fetchEmployees,
  getEmployeeById,
  deleteEmployee,
} from "./employee.service";
import EmployeeCreateModal from "./components/EmployeeCreateModal";
import EmployeeEditModal from "./components/EmployeeEditModal";
import React from "react";

export default function ManageEmployeesPage() {
  const qc = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();

  const { data, isLoading, error } = useQuery<IEmployee[], Error>({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  const employees = data ?? [];

  const [createOpen, setCreateOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<IEmployee | null>(null);

  const openCreate = () => setCreateOpen(true);
  const closeCreate = () => setCreateOpen(false);

  const openEdit = async (id: number) => {
    const emp = await getEmployeeById(id);
    setSelected(emp);
    setEditOpen(true);
  };
  const closeEdit = () => setEditOpen(false);

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteEmployee(id),
    onSuccess: () => {
      messageApi.success("Employee deleted");
      qc.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Delete failed";
      messageApi.error(msg);
    },
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const columns: ColumnsType<IEmployee> = [
    {
      title: "Full name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: string | null) => email ?? "-",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (active: boolean | null) => (active ? "Yes" : "No"),
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (v: string | null) => (v ? new Date(v).toLocaleString() : "-"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: IEmployee) => (
        <Space>
          <Button onClick={() => openEdit(record.id)}>Edit</Button>
          <Popconfirm
            title={`Delete ${record.fullName}?`}
            onConfirm={() => handleDelete(record.id)}
            okText="Delete"
            cancelText="Cancel"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (isLoading) return <div>Loading employees...</div>;
  if (error) return <div>Error loading employees: {error.message}</div>;

  return (
    <div>
      {contextHolder}
      <Button type="primary" onClick={openCreate} style={{ marginBottom: 12 }}>
        Create Employee
      </Button>
      <Table<IEmployee>
        dataSource={employees}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 4 }}
      />

      <EmployeeCreateModal
        visible={createOpen}
        onClose={closeCreate}
        messageApi={messageApi}
      />
      <EmployeeEditModal
        visible={editOpen}
        onClose={closeEdit}
        employee={selected}
        messageApi={messageApi}
      />
    </div>
  );
}
