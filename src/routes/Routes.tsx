// Routes.tsx
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import ResourceManager from "../pages/Resource Manager/ResourceManager";
import Staffer from "../pages/Staffer/Staffer";
import Dashboards from "../pages/Account Manager/Dashboards/Dashboards";
import Projects from "../pages/Account Manager/Projects/Projects";
import Clients from "../pages/Account Manager/Clients/Clients";
import AddClient from "../pages/Account Manager/Clients/AddClient";
import JobPositions from "../pages/Account Manager/Job Positions/JobPositions";
import EditClient from "../pages/Account Manager/Clients/EditClient";
import ViewClient from "../pages/Account Manager/Clients/ClientDetail/ViewClient";
import ClientDetail from "../pages/Account Manager/Clients/ClientDetail/ClientDetail";
import ClientProjects from "../pages/Account Manager/Clients/ClientDetail/ClientProjects";
import Roles from "../pages/Account Manager/Roles/Roles";
import Users from "../pages/Account Manager/User/Users";
import EditRole from "../pages/Account Manager/Roles/EditRole";
import AddRole from "../pages/Account Manager/Roles/AddRole";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "accountManager",
        children: [
          {
            path: "dashboards", // Explicit path for Dashboards
            element: <Dashboards />,
          },
          {
            path: "projects", // Explicit path for Projects
            element: <Projects />,
          },
          { path: "roles", element: <Roles /> },
          { path: "users", element: <Users /> },
          { path: "roles/:id", element: <EditRole /> },
          { path: "roles/new", element: <AddRole /> },

          {
            path: "clients", // Explicit path for Clients
            element: <Clients />,
          },
          { path: "clients/:id", element: <EditClient /> },
          { path: "clients/new", element: <AddClient /> },
          {
            path: "clients/view/:id",
            element: <ClientDetail />,
            children: [
              { index: true, element: <ViewClient /> },
              { path: "projects", element: <ClientProjects /> },
            ],
          },
          {
            path: "jobPositions", // Explicit path for Job Positions
            element: <JobPositions />,
          },
        ],
      },
      {
        path: "resourceManager",
        element: <ResourceManager />,
        errorElement: <ErrorPage />,
      },
      {
        path: "staffer",
        element: <Staffer />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default router;
