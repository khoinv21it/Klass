import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { getTaskById, updateTask } from "../services";
type Props = {};

interface IFormInput {
  title: string;
  start_date: string;
  due_date?: string;
  description?: string;
  status: "to_do" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  assignee_id?: number;
}

const schema: yup.ObjectSchema<IFormInput> = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  start_date: yup
    .string()
    .required("Start date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date"),
  due_date: yup
    .string()
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date")
    .test(
      "due_date-after-start_date",
      "Due date must be after start date",
      function (value) {
        if (!value) return true;
        const { start_date } = this.parent;
        return new Date(value) >= new Date(start_date);
      }
    ),
  description: yup
    .string()
    .optional()
    .max(500, "Description must be less than 500 characters"),
  status: yup
    .mixed<"to_do" | "in_progress" | "done">()
    .required("Status is required")
    .oneOf(["to_do", "in_progress", "done"], "Please select a valid status"),
  priority: yup
    .mixed<"low" | "medium" | "high">()
    .required("Priority is required")
    .oneOf(["low", "medium", "high"], "Please select a valid priority"),
  assignee_id: yup
    .number()
    .min(1, "Assignee ID must be a positive number")
    .test("assignee_id", "Assignee ID cannot be empty if provided", (value) => {
      if (!value) return true;
      return !isNaN(Number(value)) && Number(value) >= 1;
    }),
});

export default function UpdateTasksPage({}: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const task = await getTaskById(id ? parseInt(id) : 0);
        reset({
          title: task.title,
          start_date: task.start_date
            ? new Date(task.start_date).toISOString().split("T")[0]
            : "",
          due_date: task.due_date
            ? new Date(task.due_date).toISOString().split("T")[0]
            : "",
          description: task.description || "",
          status: task.status,
          priority: task.priority,
          assignee_id: task.assignee_id || "",
        });
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
    fetchTask();
  }, [id]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      start_date: "",
      due_date: "",
      description: "",
      status: "to_do",
      priority: "low",
      assignee_id: undefined,
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {
    try {
      await updateTask(id ? parseInt(id) : 0, data);
      navigate("/lesson10/tasks");
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Update Task
        </h2>
        <div>
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-1"
          >
            Title
          </label>
          <input
            {...register("title")}
            type="text"
            placeholder="Enter task title"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="start_date"
            className="block text-gray-700 font-medium mb-1"
          >
            Start Date
          </label>
          <input
            {...register("start_date")}
            type="date"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.start_date ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.start_date && (
            <p className="text-red-500 text-sm mt-1">
              {errors.start_date.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="due_date"
            className="block text-gray-700 font-medium mb-1"
          >
            Due Date
          </label>
          <input
            {...register("due_date")}
            type="date"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.due_date ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.due_date && (
            <p className="text-red-500 text-sm mt-1">
              {errors.due_date.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-1"
          >
            Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Enter task description"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-gray-700 font-medium mb-1"
          >
            Status
          </label>
          <select
            {...register("status")}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.status ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="to_do">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="priority"
            className="block text-gray-700 font-medium mb-1"
          >
            Priority
          </label>
          <select
            {...register("priority")}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.priority ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && (
            <p className="text-red-500 text-sm mt-1">
              {errors.priority.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="assignee_id"
            className="block text-gray-700 font-medium mb-1"
          >
            Assignee ID
          </label>
          <input
            {...register("assignee_id")}
            type="number"
            placeholder="Enter assignee ID (optional)"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.assignee_id ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.assignee_id && (
            <p className="text-red-500 text-sm mt-1">
              {errors.assignee_id.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Update Task
        </button>
      </form>
    </div>
  );
}
