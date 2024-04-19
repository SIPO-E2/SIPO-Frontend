// Routes.tsx
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import Staffer from "../pages/Staffer/Staffer";
import Dashboards from "../pages/Account Manager/Dashboards/Dashboards";
import Projects from "../pages/Account Manager/Projects/Projects";
import Clients from "../pages/Account Manager/Clients/Clients";
import JobPositions from "../pages/Account Manager/Job Positions/JobPositions";
import NewProjects from "../pages/Account Manager/Projects/NewProject";
import NewJobPosition from "../pages/Account Manager/Job Positions/NewJobPosition";
<<<<<<< HEAD
import ResourcePage from "../pages/ResourceManger/ResourcePage";
import PipelinePage from "../pages/ResourceManger/PipelinePage";
import EditBillingPage from "../pages/ResourceManger/EditBillingPage";
import EditBenchPage from "../pages/ResourceManger/EditBenchPage";
import EditPipelinePage from "../pages/ResourceManger/EditPipelinePage";
import BillingPage from "../pages/ResourceManger/BillingPage";
import BenchPage from "../pages/ResourceManger/BenchPage";
import AddPipelinegPage from "../pages/ResourceManger/AddPipelinePage";
import AddBenchPage from "../pages/ResourceManger/AddBenchPage";
import AddBillingPage from "../pages/ResourceManger/AddBillingPage";
=======
import ResourcePage from "../pages/ResourceManager/ResourcePage";
import PipelinePage from "../pages/ResourceManager/Pipeline/PipelinePage";
import BillingPage from "../pages/ResourceManager/Billing/BillingPage";
import BenchPage from "../pages/ResourceManager/Bench/BenchPage";
import AddPipelinegPage from "../pages/ResourceManager/Pipeline/AddPipelinePage";
import AddBenchPage from "../pages/ResourceManager/Bench/AddBenchPage";
import AddBillingPage from "../pages/ResourceManager/Billing/AddBillingPage";
import Dashboard from "../pages/ResourceManager/Dashboard/Dashboard";
>>>>>>> a894fbad52c62bae7c6be181c7848f91c28255c4


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
            path: "projects/newProjects", // Explicit path for NewProjects
            element: <NewProjects />,

          },
         
          {
            path: "clients", // Explicit path for Clients
            element: <Clients />,
          },
          {
            path: "jobPositions", // Explicit path for Job Positions
            element: <JobPositions />,
          },

          {
            path: "jobPositions/newJobPosition",
            element: <NewJobPosition/>,
          }
        ],
      },
      //ResurceManger Routes
      {
        path: "/resourceManager",
        element: <ResourcePage />,
      },

      {
        path: "resourceManager/pipeline",
        element: <PipelinePage />,
      },
      {
        path: "/resourceManager/bench",
        element: <BenchPage />,
      },

      {
        path: "/resourceManager/billing",
        element: <BillingPage />,
      },

      {
        path: "/resourceManager/dashboard",
        element: <Dashboard />,
      },

      {
        path: "/resourceManager/addNewPipeline",
        element: <AddPipelinegPage />,
      },

      {
        path: "/resourceManager/addNewBench",
        element: <AddBenchPage />,
      },

      {
        path: "/resourceManager/addNewBilling",
        element: <AddBillingPage />,
      },
      {
        path: "/editPipelinePage",
        element: <EditPipelinePage />,
      },
      
      {
        path: "/editBenchPage",
        element: <EditBenchPage />,
      },
      
      {
        path: "/editBillingPage",
        element: <EditBillingPage />,
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
