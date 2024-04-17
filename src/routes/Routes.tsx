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

          {
            path: "clients", // Explicit path for Clients
            element: <Clients />,
          },
          { path: "clients/:id", element: <EditClient /> },
          { path: "clients/new", element: <AddClient /> },
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
