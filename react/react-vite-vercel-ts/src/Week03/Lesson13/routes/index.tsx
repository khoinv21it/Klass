import LoginPage from "../pages/LoginPage";
import OurTasksPage from "../pages/OurTasksPage";
import RolesPage from "../pages/RolesPage";
import TestPage from "../pages/TestPage";
import UsersPage from "../pages/UsersPage";

const routes = [
  {
    path: 'login',
    name: 'Login',
    isPublic: true,
    showOnMenu: true,
    element: <LoginPage />,
    roles: []
  },
  {
    path: 'tasks',
    name: 'Tasks',
    showOnMenu: true,
    element: <OurTasksPage />,
    roles: ['users']
  },
  {
    path: 'users',
    name: 'Users',
    showOnMenu: true,
    element: <UsersPage />,
    roles: ['managers', 'administrators']
  },
  {
    path: 'roles',
    name: 'Roles',
    showOnMenu: true,
    element: <RolesPage />,
    roles: ['administrators']
  },
  {
    path: 'members',
    name: 'Members',
    showOnMenu: true,
    element: <div>memberpage</div>,
    roles: ['member']
  },
  {
    path: 'test',
    name: 'Test',
    showOnMenu: true,
    element: <TestPage />,
    roles: ['member']
  },
]

export default routes;