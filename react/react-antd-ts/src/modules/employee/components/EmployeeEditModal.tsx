import React from "react";
import { Modal, Form, Input, Select, message } from "antd";
import type { MessageInstance } from "antd/es/message/interface";
import type { IEmployee } from "../employee.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmployee } from "../employee.service";

const { Option } = Select;

export default function EmployeeEditModal({
  visible,
  onClose,
  employee,
  messageApi,
}: {
  visible: boolean;
  onClose: () => void;
  employee: IEmployee | null;
  messageApi?: MessageInstance;
}) {
  const [form] = Form.useForm();
  const qc = useQueryClient();

  React.useEffect(() => {
    if (employee) {
      form.setFieldsValue({
        fullName: employee.fullName,
        email: employee.email,
        phoneNumber: employee.phoneNumber,
        gender: employee.gender,
      });
    } else {
      form.resetFields();
    }
  }, [employee, form]);

  const mutation = useMutation<
    IEmployee,
    unknown,
    { id: number; values: Partial<IEmployee> }
  >({
    mutationFn: ({ id, values }) => updateEmployee(id, values),
    onSuccess: () => {
      if (messageApi) messageApi.success("Employee updated");
      else message.success("Employee updated");
      qc.invalidateQueries({ queryKey: ["employees"] });
      onClose();
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Update failed";
      if (messageApi) messageApi.error(msg);
      else message.error(msg);
    },
  });

  const handleOk = async () => {
    const values = await form.validateFields();
    if (!employee) return;
    // do not send email in update payload (email is read-only)
    const payload = { ...values } as Partial<IEmployee>;
    delete (payload as Partial<IEmployee>).email;
    mutation.mutate({ id: employee.id as number, values: payload });
  };

  return (
    <Modal
      title="Edit Employee"
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Save"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="fullName"
          label="Full name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input disabled />
        </Form.Item>
        <Form.Item name="phoneNumber" label="Phone">
          <Input />
        </Form.Item>
        <Form.Item name="gender" label="Gender">
          <Select allowClear>
            <Option value="MALE">Male</Option>
            <Option value="FEMALE">Female</Option>
            <Option value="OTHER">Other</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
