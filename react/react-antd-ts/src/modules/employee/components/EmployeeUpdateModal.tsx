
import { Modal, Input, Form, Select, message } from "antd";
import type { MessageInstance } from "antd/es/message/interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IEmployee } from "../employee.type";
import { updateEmployee } from "../employee.service";

type Props = {
  open: boolean;
  onClose: () => void;
  employee: IEmployee | null;
  messageApi?: MessageInstance;
};

export default function EmployeeUpdateModal({
  open,
  onClose,
  employee,
  messageApi,
}: Props) {
  const [form] = Form.useForm();

  const qc = useQueryClient();

  const mutation = useMutation<IEmployee, unknown, { id: number; values: Partial<IEmployee> }>({
    mutationFn: ({ id, values }) => updateEmployee(id, values),
    onSuccess: () => {
      if (messageApi) messageApi.success("Employee updated");
      else message.success("Employee updated");

      qc.invalidateQueries({ queryKey: ["employees"] });
      onClose();
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message[0] : "Update failed";
      if (messageApi) messageApi.error(msg);
      else message.error(msg);
    },
  });


  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("Update values:", values);
      if (!employee) return;
      const payload = { ...values } as Partial<IEmployee>;
      mutation.mutate({ id: employee.id, values: payload });
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
      title="Update Employee"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: "Please enter full name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Phone Number" name="phoneNumber"
        //10 ki tu
        rules={[ { len: 10, message: "Phone number must be 10 digits" }]}>
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
  );
}
