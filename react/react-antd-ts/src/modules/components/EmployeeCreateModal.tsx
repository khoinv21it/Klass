import { Modal, Form, Input, Select, message } from "antd";
import { createEmployee } from "../employee/employee.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IEmployee } from "../employee/employee.type";
import type { MessageInstance } from "antd/es/message/interface";

type Props = {
  open: boolean;
  onClose: () => void;
  messageApi?: MessageInstance;
};

export default function EmployeeCreateModal({
  open,
  onClose,
  messageApi,
}: Props) {
  const [form] = Form.useForm();
  const qc = useQueryClient();
  const mutation = useMutation<IEmployee, unknown, Partial<IEmployee>>({
    mutationFn: (data) => createEmployee(data),
    onSuccess: () => {
      if (messageApi) messageApi.success("Employee created");
      else message.success("Employee created");

      qc.invalidateQueries({ queryKey: ["employees"] });
      onClose();
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message[0] : "Create failed";
      if (messageApi) messageApi.error(msg);
      else message.error(msg);
    },
  });

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      mutation.mutate(values as Partial<IEmployee>);
    } catch (e) {
      // validation error
      console.log("Validation failed:", e);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={handleOk}
      title="Create Employee"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: "Please enter full name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Phone Number" name="phoneNumber"
          rules={[ { len: 10, message: "Phone number must be 10 digits" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
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
  );
}
