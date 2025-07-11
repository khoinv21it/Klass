import { Navigate, NavLink, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import OurTasksPage from "./pages/OurTasksPage";
import MainPage from "./pages/MainPage";
import AccessDeniedPage from "./pages/AccessDeniedPage";
import MyTasksPage from "./pages/MyTasksPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import UpdateTasksPage from "./pages/UpdateTasksPage";
import { useEffect, useState } from "react";
import type { User } from "./types";
import AuthContext from "./context";
import Skeleton from "react-loading-skeleton";

type Props = {};

export default function TaskManagement({}: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      console.log("User found in localStorage:", storedUser);
      setUser(JSON.parse(storedUser));
      setLoading(false);
    }
  }, []);

  const handleLogout = async () => {
    // Clear user from state and localStorage
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    // Optionally, redirect to login page or show a message
    window.location.href = "/lesson10";
  };

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-50">
  //       <div className="w-full max-w-md">
  //         <Skeleton height={40} className="mb-6" />
  //         <Skeleton count={5} height={32} className="mb-2" />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-blue-600 py-4 mb-6 shadow">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-4">
            <h1 className="text-2xl font-bold text-white">
              Tasks Management Guidelines
            </h1>
            {user && (
              <p className="text-white mt-2 sm:mt-0">
                Hi, <span className="font-semibold">{user?.email}</span>
              </p>
            )}
          </div>
        </header>

        <nav className="mb-6 flex flex-wrap items-center justify-center gap-4">
          { !user && <NavLink
            className={({ isActive }) =>
              `px-3 py-1 rounded transition ${
                isActive
                  ? "bg-blue-600 text-white font-bold"
                  : "text-blue-600 hover:bg-blue-100"
              }`
            }
            to="/lesson10/login"
          >
            Login{" "}
          </NavLink>}
          <NavLink
            className={({ isActive }) =>
              `px-3 py-1 rounded transition ${
                isActive
                  ? "bg-blue-600 text-white font-bold"
                  : "text-blue-600 hover:bg-blue-100"
              }`
            }
            to="/lesson10/tasks"
          >
            Tasks
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `px-3 py-1 rounded transition ${
                isActive
                  ? "bg-blue-600 text-white font-bold"
                  : "text-blue-600 hover:bg-blue-100"
              }`
            }
            to="/lesson10/assignee-me"
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
            to="/lesson10/create-task"
          >
            Create Task
          </NavLink>
          {user && (
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </nav>

        <main className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<MainPage />}>
              <Route index element={<LoginPage />} />
              <Route path="login" element={<LoginPage />} />

              {/* Private */}
              {user && <Route path="tasks" element={<OurTasksPage />} />}
              {user && <Route path="assignee-me" element={<MyTasksPage />} />}
              {user && (
                <Route path="create-task" element={<CreateTaskPage />} />
              )}
              {user && (
                <Route path="update-task/:id" element={<UpdateTasksPage />} />
              )}

              <Route path="*" element={<AccessDeniedPage />} />
            </Route>
          </Routes>
        </main>
      </div>
    </AuthContext.Provider>
  );
}
