/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Popconfirm,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  message,
  Tag,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import type { IEmployee } from "../employee/employee.type";

import { useGetEmployees } from "./api/getEmployee";
import { useCreateEmployee } from "./api/createEmployee";
import { useUpdateEmployee } from "./api/updateEmployee";
import { useDeleteEmployee } from "./api/deleteEmployee";
import { checkExistedEmail } from "./api/checkExistedEmail";

export default function ManageEmployeesQueryPage() {
  const [messageApi, contextHolder] = message.useMessage();

  const { data, isLoading, isError } = useGetEmployees();
  const employees = data ?? [];

  const createMutation = useCreateEmployee();
  const updateMutation = useUpdateEmployee();
  const deleteMutation = useDeleteEmployee();

  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [selected, setSelected] = useState<IEmployee | null>(null);

  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  useEffect(() => {
    if (selected) {
      updateForm.setFieldsValue({
        fullName: selected.fullName,
        phoneNumber: selected.phoneNumber,
        gender: selected.gender ?? undefined,
        dateOfBirth: selected.dateOfBirth ? dayjs(selected.dateOfBirth) : null,
        active: selected.active,
      });
    } else {
      updateForm.resetFields();
    }
  }, [selected, updateForm]);

  const handleCreate = async () => {
    try {
      const values = await createForm.validateFields();
      const payload: any = { ...values };
      if (
        payload.dateOfBirth &&
        typeof payload.dateOfBirth.format === "function"
      ) {
        payload.dateOfBirth = payload.dateOfBirth.format("YYYY-MM-DD");
      }
      createMutation.mutate(payload, {
        onSuccess: () => {
          messageApi.success("Employee created");
          setCreateOpen(false);
          createForm.resetFields();
          // create hook already updates cache; optionally refetch
          // refetch();
        },
        onError: (err) => {
          const e: any = err;
          const data = e?.response?.data ?? e?.data;
          const msg = Array.isArray(data?.message)
            ? data.message[0]
            : data?.message ?? e?.message ?? "Create failed";
          messageApi.error(msg);
        },
      });
    } catch (e) {
      console.log(e);
      // validation error
    }
  };

  const openUpdate = (row: IEmployee) => {
    setSelected(row);
    setUpdateOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const values = await updateForm.validateFields();
      if (!selected) return;
      const payload: any = { ...values };
      if (
        payload.dateOfBirth &&
        typeof payload.dateOfBirth.format === "function"
      ) {
        payload.dateOfBirth = payload.dateOfBirth.format("YYYY-MM-DD");
      }
      updateMutation.mutate(
        { id: selected.id, data: payload },
        {
          onSuccess: () => {
            messageApi.success("Employee updated");
            setUpdateOpen(false);
            setSelected(null);
            updateForm.resetFields();
          },
          onError: (err) => {
            const e: any = err;
            const data = e?.response?.data ?? e?.data;
            const msg = Array.isArray(data?.message)
              ? data.message[0]
              : data?.message ?? e?.message ?? "Update failed";
            messageApi.error(msg);
          },
        }
      );
    } catch (e) {
      console.log(e);
      // validation error
    }
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        messageApi.success("Employee deleted");
      },
      onError: (err) => {
        const e: any = err;
        const data = e?.response?.data ?? e?.data;
        const msg = Array.isArray(data?.message)
          ? data.message[0]
          : data?.message ?? e?.message ?? "Delete failed";
        messageApi.error(msg);
      },
    });
  };

  const columns: ColumnsType<IEmployee> = [
    { title: "Full name", dataIndex: "fullName", key: "fullName" },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (v) => v ?? "-",
    },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { title: "Phone", dataIndex: "phoneNumber", key: "phoneNumber" },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (v: string | null) =>
        v ? new Date(v).toLocaleDateString() : "-",
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (a: boolean | null) =>
        a ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>,
    },
    {
      title: "",
      key: "actions",
      width: "1%",
      render: (_: any, record: IEmployee) => (
        <Space>
          <Button type="primary" onClick={() => openUpdate(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete this employee?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="default" danger loading={deleteMutation.isPending}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (isLoading) return <div>Loading employees...</div>;
  if (isError) return <div>Error loading employees</div>;

  return (
    <div>
      {contextHolder}
      <Button
        type="primary"
        onClick={() => setCreateOpen(true)}
        style={{ marginBottom: 12 }}
      >
        Create Employee
      </Button>
      <Table<IEmployee>
        dataSource={employees}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 8 }}
      />

      <Modal
        title="Create Employee"
        open={createOpen}
        onOk={handleCreate}
        onCancel={() => {
          setCreateOpen(false);
          createForm.resetFields();
        }}
        confirmLoading={createMutation.isPending}
      >
        <Form form={createForm} layout="vertical">
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              { required: true, message: "Please enter full name" },
              {
                min: 4,
                max: 160,
                message: "Full name must be between 4 and 160 characters",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter valid email" },
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();
                  return checkExistedEmail(value)
                    .then((exists) => {
                      if (exists) {
                        return Promise.reject(
                          new Error("Email already exists")
                        );
                      }
                      return Promise.resolve();
                    })
                    .catch((error) => {
                      console.error("Error checking email existence:", error);
                      return Promise.reject(
                        new Error(
                          "Unable to verify email existence, please try again"
                        )
                      );
                    });
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date of Birth"
            name="dateOfBirth"
            rules={[
              { required: false },
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();
                  if (dayjs(value).isAfter(dayjs(), "day")) {
                    return Promise.reject(
                      new Error("Date of birth cannot be in the future")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: false },
              { len: 10, message: "Phone number must be exactly 10 digits" },
              {
                pattern: /^\d{10}$/,
                message: "Phone number must contain only digits (0-9)",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="Gender" name="gender">
            <Select allowClear>
              <Select.Option value="MALE">Male</Select.Option>
              <Select.Option value="FEMALE">Female</Select.Option>
              <Select.Option value="OTHER">Other</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Update Employee"
        open={updateOpen}
        onOk={handleUpdate}
        onCancel={() => {
          setUpdateOpen(false);
          setSelected(null);
          updateForm.resetFields();
        }}
        confirmLoading={updateMutation.isPending}
      >
        <Form form={updateForm} layout="vertical">
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              { required: true, message: "Please enter full name" },
              {
                min: 4,
                max: 160,
                message: "Full name must be between 4 and 160 characters",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date of Birth"
            name="dateOfBirth"
            rules={[
              { required: false },
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();
                  if (dayjs(value).isAfter(dayjs(), "day")) {
                    return Promise.reject(
                      new Error("Date of birth cannot be in the future")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: false },
              { len: 10, message: "Phone number must be exactly 10 digits" },
              {
                pattern: /^\d{10}$/,
                message: "Phone number must contain only digits (0-9)",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Gender" name="gender">
            <Select allowClear>
              <Select.Option value="MALE">Male</Select.Option>
              <Select.Option value="FEMALE">Female</Select.Option>
              <Select.Option value="OTHER">Other</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
