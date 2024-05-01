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
import EditProjects from "../pages/Account Manager/Projects/EditProject";
import NewJobPosition from "../pages/Account Manager/Job Positions/NewJobPosition";
import ViewJobPosition from "../pages/Account Manager/Job Positions/ViewJobPosition"; 
import EditJobPosition from "../pages/Account Manager/Job Positions/EditJobPosition";
import ResourcePage from "../pages/ResourceManager/ResourcePage";
import PipelinePage from "../pages/ResourceManager/Pipeline/PipelinePage";
import BillingPage from "../pages/ResourceManager/Billing/BillingPage";
import BenchPage from "../pages/ResourceManager/Bench/BenchPage";
import AddPipelinegPage from "../pages/ResourceManager/Pipeline/AddPipelinePage";
import AddBenchPage from "../pages/ResourceManager/Bench/AddBenchPage";
import AddBillingPage from "../pages/ResourceManager/Billing/AddBillingPage";
import Dashboard from "../pages/ResourceManager/Dashboard/Dashboard";
import EditPipelinePage from "../pages/ResourceManager/Pipeline/EditPipelinePage";
import EditBillingPage from "../pages/ResourceManager/Billing/EditBillingPage";
import EditBenchPage from "../pages/ResourceManager/Bench/EditBenchPage";
import AddCandidatePage from "../pages/ResourceManager/AddCandidatePage";
import AddPersonPage from "../pages/ResourceManager/AddPersonPage";

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
            path: "projects/editProjects/:id", // Explicit path for EditProjects
            element: <EditProjects />,

          },
          {
            path: "projects/editProjects/:id", // Ruta para la página de edición de proyectos
            element: <EditProjects />,
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
          },

          {
            path: "jobPositions/viewJobPosition",
            element: <ViewJobPosition/>,
          },
          
          {
            path: "jobPositions/editJobPosition/:id", // Explicit path for EditProjects
            element: <EditJobPosition />,

          }
          
        ],
      },
      
      //ResurceManger Routes
      {
        path: "/resourceManager",
        element: <ResourcePage />,
      },

      {
        path: "/resourceManager/pipeline",
        element: <PipelinePage/>,
      },
      {
        path: "/resourceManager/bench",
        element: <BenchPage/>,
      },

      {
        path: "/resourceManager/billing",
        element: <BillingPage/>,
      },

      {
        path: "/resourceManager/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/resourceManager/addnewPerson",
        element:  <AddPersonPage/>
      },
      {
        path: "/resourceManager/addnewCandidate",
        element:  <AddCandidatePage/>
      },
      {
        path: "/resourceManager/pipeline/addNewPipeline",
        element: <AddPipelinegPage />,
      },

      {
        path: "/resourceManager/bench/addNewBench/:id",
        element: <AddBenchPage id={""} />,
      },

      {
        path: "/resourceManager/billing/addNewBilling",
        element: <AddBillingPage />,
      },
      {
        path: "/resourceManager/pipeline/editPipeline/:id",
        element: <EditPipelinePage id={""}/>,
      },
      
      {
        path: "/resourceManager/bench/editBench/:id",
        element: <EditBenchPage id={""}/>,
      },
      
      {
        path: "/resourceManager/billing/editBilling/:id",
        element: <EditBillingPage id={""}/>,
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
