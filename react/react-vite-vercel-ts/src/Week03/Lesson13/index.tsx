import React from "react";
import { useAuthStore } from "./useAuthStore";
import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./routes";
import MainLayout from "./MainLayout";
import AccessDeniedPage from "../Lesson13/pages/AccessDeniedPage";

export default function Lesson13() {
  const { loggedInUser } = useAuthStore((state) => state);
  // Get array of user roles ["code"]
  const userRoles: string[] = loggedInUser?.roles?.map((role: any) => role.code?.toLowerCase()) || [];
  console.log('userRoles', userRoles);
  const generatedRoutes: any[] = routes
    .map((route) => {
      const routeRoles: string[] = route.roles?.map((role: string) => role?.toLowerCase()) || [];
      const hasAccess = userRoles.some((role: string) => {
        return role?.toLowerCase() === 'administrators' || routeRoles.includes(role?.toLowerCase());
      });
      return hasAccess
        ? {
            path: route.path,
            element: route.element,
          }
        : null;
    })
    .filter(Boolean); // Filter out null values

  routes.forEach((route) => {
    if (route.isPublic) {
      generatedRoutes.push({
        path: route.path,
        element: route.element,
      });
    }
  });

  const router = createBrowserRouter([
    {
      path: '/lesson13',
      element: <MainLayout />,
      children: generatedRoutes,
    },

    //  NO MATCH ROUTE
    {
      path: '*',
      element: (
        <main style={{ padding: '1rem' }}>
          <AccessDeniedPage />
        </main>
      ),
    },
  ]);
  return (
    <div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </React.Suspense>
    </div>
  );
}
