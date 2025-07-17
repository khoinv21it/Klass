import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

interface IFormInput {
  status: string;
  priority: string;
  title?: string;
}

type Props = {
  onSearch?: (filters: IFormInput) => void;
};

export default function SearchTasks({ onSearch }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      status: "",
      priority: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: IFormInput) => {
    if (onSearch && typeof onSearch === "function") {
      onSearch(data);
    }
  };

  return (
    <div className="mb-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap items-end gap-6 bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg border border-blue-200"
      >
        <div className="flex flex-col">
          <label
            htmlFor="status"
            className="text-sm font-semibold text-blue-700 mb-2"
          >
            Status
          </label>
          <select
            {...register("status")}
            id="status"
            name="status"
            className="w-44 px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          >
            <option value="">All Statuses</option>
            <option value="to_do">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="priority"
            className="text-sm font-semibold text-blue-700 mb-2"
          >
            Priority
          </label>
          <select
            {...register("priority")}
            id="priority"
            name="priority"
            className="w-44 px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && (
            <p className="text-red-500 text-xs mt-1">
              {errors.priority.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="text-sm font-semibold text-blue-700 mb-2"
          >
            Task Name
          </label>
          <input
            {...register("title")}
            id="title"
            name="title"
            type="text"
            placeholder="Search by task name"
            className="w-44 px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>

        <div>
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition shadow"
          >
            <FaSearch className="text-white text-lg" />
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
