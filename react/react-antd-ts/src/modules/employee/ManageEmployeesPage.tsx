import { Button, message, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { IEmployee } from "./employee.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchEmployees, deleteEmployee, getEmployeeById } from "./employee.service";
import { useState } from "react";
import EmployeeCreateModal from "../components/EmployeeCreateModal";
import EmployeeUpdateModal from "../components/EmployeeUpdateModal";

const ManageEmployeesPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(null);
  const qc = useQueryClient();

  const { data, isLoading, isError } = useQuery<IEmployee[]>({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  const employees = data || [];

  const columns: ColumnsType<IEmployee> = [
    {
      title: "Full name",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
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
      sorter: (a, b) => {
        const genderOrder: Record<string, number> = {
          MALE: 1,
          FEMALE: 2,
          OTHER: 3,
        };
        const aGender = a.gender ?? "";
        const bGender = b.gender ?? "";
        return (genderOrder[aGender] || 0) - (genderOrder[bGender] || 0);
      },
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
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record: IEmployee) => (
        <Space>
          <Button type="link" onClick={() => openUpdate(record.id)}>
            Edit
          </Button>

          <Popconfirm
            title="Are you sure to delete this employee?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const deleteMutation = useMutation<void, unknown, number>({
    mutationFn: (id) => deleteEmployee(id),
    onSuccess: () => {
      messageApi.success("Employee deleted");
      qc.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Delete failed";
      messageApi.error(msg);
    },
  });

  const handleDelete = async (id: number) => {
    deleteMutation.mutate(id);
  };
  const openCreate = () => {
    setCreateOpen(true);
  };
  const closeCreate = () => {
    setCreateOpen(false);
  };
  const openUpdate = async(id : number) => {
    const employee = await getEmployeeById(id);
    setSelectedEmployee(employee);
    setUpdateOpen(true);
  };
  const closeUpdate = () => {
    setSelectedEmployee(null);
    setUpdateOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading employees</div>;

  return (
    <div>
      {contextHolder}
      <Button type="primary" onClick={openCreate} className="mb-4">
        Create Employee
      </Button>
      <Table<IEmployee>
        dataSource={employees || []}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 8 }}
      />

      <EmployeeCreateModal
        open={createOpen}
        onClose={closeCreate}
        messageApi={messageApi}
      />

      <EmployeeUpdateModal
        open={updateOpen}
        onClose={closeUpdate}
        employee={selectedEmployee}
        messageApi={messageApi}
      />
    </div>
  );
};

export default ManageEmployeesPage;
