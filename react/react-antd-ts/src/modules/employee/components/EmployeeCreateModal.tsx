import { Modal, Form, Input, Select, message } from "antd";
import type { MessageInstance } from "antd/es/message/interface";
import type { IEmployee } from "../employee.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployee } from "../employee.service";

const { Option } = Select;

export default function EmployeeCreateModal({
  visible,
  onClose,
  messageApi,
}: {
  visible: boolean;
  onClose: () => void;
  messageApi?: MessageInstance;
}) {
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
      const msg = err instanceof Error ? err.message : "Create failed";
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
      title="Create Employee"
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Create"
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
          <Input />
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
