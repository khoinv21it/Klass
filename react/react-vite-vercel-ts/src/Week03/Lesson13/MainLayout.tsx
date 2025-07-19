import { NavLink, Outlet } from "react-router";
import { useAuthStore } from "./useAuthStore";
import routes from "./routes";

export default function MainLayout() {
  const { loggedInUser, logOut } = useAuthStore((state) => state);
  // Get array of user roles ["code"]
  const userRoles: string[] =
    loggedInUser?.roles?.map((role: any) => role.code?.toLowerCase()) || [];
  console.log("userRoles", userRoles);
  console.log("routes", routes);
  console.log("Current user:", loggedInUser);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {loggedInUser && (
        <div className="flex items-center justify-around bg-blue-100 py-4 mb-4 shadow">
          <nav className="flex gap-4">
            {routes.map((route) => {
              if (route.showOnMenu === false) {
                return null;
              }
              const routeRoles: string[] =
                route.roles?.map((role: string) => role?.toLowerCase()) || [];
              const hasAccess = userRoles.some((role: string) => {
                return (
                  role?.toLowerCase() === "administrators" ||
                  routeRoles.includes(role?.toLowerCase())
                );
              });

              if (!hasAccess) {
                return null;
              }
              
              return (
                <NavLink
                  key={route.path}
                  to={route.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg font-semibold transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow"
                        : "text-blue-700 hover:bg-blue-200"
                    }`
                  }
                >
                  {route.name}
                </NavLink>
              );
            })}
          </nav>
          <button
            onClick={async () => {
              logOut().then(() => {
                window.location.href = "/lesson13/login";
              });
            }}
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-bold shadow hover:bg-red-600 transition-all"
          >
            Logout
          </button>
        </div>
      )}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
