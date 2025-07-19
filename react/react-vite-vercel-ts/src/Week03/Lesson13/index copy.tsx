import { NavLink, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import OurTasksPage from "./pages/OurTasksPage";
import MainPage from "./pages/MainPage";
import AccessDeniedPage from "./pages/AccessDeniedPage";
import MyTasksPage from "./pages/MyTasksPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import { useAuthStore } from "./useAuthStore";
import { useEffect } from "react";

export default function Lesson13() {
  const { logOut, loggedInUser } = useAuthStore((state) => state);
  useEffect(() => {
    // You can perform side effects here, such as redirecting or showing a message.
    // If you want to render something conditionally, do it in the return statement below.
    loginout();
  }, [loggedInUser, logOut]);

  const loginout = () => {
    if (loggedInUser) {
      return (
        <NavLink to="/lesson13">
          <button
            onClick={() => logOut()}
            className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </NavLink>
      );

    } else {
      return (
        <NavLink
          className={({ isActive }) =>
            `px-3 py-1 rounded transition ${
              isActive
                ? "bg-blue-600 text-white font-bold"
                : "text-blue-600 hover:bg-blue-100"
            }`
          }
          to="/lesson13/login"
        >
          Login{" "}
        </NavLink>
      );
    }
      
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 py-4 mb-6 shadow">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-white">Tasks Management</h1>

          <p className="text-white mt-2 sm:mt-0">
            Hi, <span className="font-semibold">user</span>
          </p>
        </div>
      </header>

      <nav className="mb-6 flex flex-wrap items-center justify-center gap-4">

        <NavLink
          className={({ isActive }) =>
            `px-3 py-1 rounded transition ${
              isActive
                ? "bg-blue-600 text-white font-bold"
                : "text-blue-600 hover:bg-blue-100"
            }`
          }
          to="/lesson13/tasks"
        >
          Tasks
        </NavLink>

        {/* <NavLink
          className={({ isActive }) =>
            `px-3 py-1 rounded transition ${
              isActive
                ? "bg-blue-600 text-white font-bold"
                : "text-blue-600 hover:bg-blue-100"
            }`
          }
          to="/lesson13/assignee-me"
        >
          My Tasks
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `px-3 py-1 rounded transition ${
              isActive
                ? "bg-blue-600 text-white font-bold"
                : "text-blue-600 hover:bg-blue-100"
            }`
          }
          to="/lesson13/create-task"
        >
          Create Task
        </NavLink> */}

        {loginout()}
      </nav>

      <main className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route index element={<LoginPage />} />
            <Route path="login" element={<LoginPage />} />

            <Route path="tasks" element={<OurTasksPage />} />
            <Route path="assignee-me" element={<MyTasksPage />} />

            <Route path="create-task" element={<CreateTaskPage />} />

            <Route path="*" element={<AccessDeniedPage />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}
