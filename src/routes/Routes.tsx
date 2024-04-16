import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import ResourceManager from "../pages/Resource Manager/ResourceManager";
import Staffer from "../pages/Staffer/Staffer";
import Projects from "../pages/Account Manager/Projects/Projects";
import Clients from "../pages/Account Manager/Clients/Clients";
import JobPositions from "../pages/Account Manager/Job Positions/JobPositions";
import Dashboards from "../pages/Account Manager/Dashboards/Dashboards";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "accountManager", // Changed from "/accountManager" to "accountManager" for relative path
        element: <Dashboards />,
        children: [
          {
            path: "projects", // Relative path
            element: <Projects />,
          },
          {
            path: "clients", // Relative path
            element: <Clients />,
          },
          {
            path: "jobPositions", // Relative path
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
    errorElement: <ErrorPage />,
  },
]);

export default router;
