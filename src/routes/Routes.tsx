// Routes.tsx
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import Staffer from "../pages/Staffer/Staffer";
import Dashboards from "../pages/Account Manager/Dashboards/Dashboards";
import Projects from "../pages/Account Manager/Projects/Projects";
import JobPositions from "../pages/Account Manager/Job Positions/JobPositions";
import NewProjects from "../pages/Account Manager/Projects/NewProject";
import EditProjects from "../pages/Account Manager/Projects/EditProject";
import NewJobPosition from "../pages/Account Manager/Job Positions/NewJobPosition";
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
// import ViewPipelineModal from "../pages/ResourceManager/Pipeline/ViewPipelineModal";
// import AddPersonPage from "../pages/ResourceManager/AddPersonPage";
// import AddCandidatePage from "../pages/ResourceManager/AddCandidatePage";
import EditJobPosition from "../pages/Account Manager/Job Positions/EditJobPosition";
// import ViewPipelineModal from "../pages/ResourceManager/Pipeline/ViewPipelineModal";
import AddPersonPage from "../pages/ResourceManager/AddPersonPage";
import AddCandidatePage from "../pages/ResourceManager/AddCandidatePage";
import CandidatesAllocationTable from "../components/CandidatesAllocationTable";
import CandidatesAllocation from "../pages/Staffer/CandidatesAllocation";
//Roles
import Roles from "../pages/Admin/Roles/Roles";
// User
import Users from "../pages/Admin/User/Users";
import AddUser from "../pages/Admin/User/AddUser";
import EditUser from "../pages/Admin/User/EditUser";
//Client
import Clients from "../pages/Account Manager/Clients/Clients";
import AddClient from "../pages/Account Manager/Clients/AddClient";
import EditClient from "../pages/Account Manager/Clients/EditClient";
import ViewClient from "../pages/Account Manager/Clients/ClientDetail/ViewClient";
import ClientDetail from "../pages/Account Manager/Clients/ClientDetail/ClientDetail";
import ClientProjects from "../pages/Account Manager/Clients/ClientDetail/ClientProjects";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      //Admin Routes
      {
        path: "admin",
        children: [
          {
            path: "roles",
            element: <Roles />,
          },
          { path: "users", element: <Users /> },
          { path: "users/new", element: <AddUser /> },
          { path: "users/:id", element: <EditUser /> },
        ],
      },
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

          {
            path: "jobPositions/newJobPosition",
            element: <NewJobPosition />,
          },

          {
            path: "jobPositions/editJobPosition/:id",
            element: <EditJobPosition />,
          },
        ],
      },

      //ResurceManger Routes
      {
        path: "/resourceManager",
        element: <ResourcePage />,
      },

      {
        path: "/resourceManager/pipeline",
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
        path: "/resourceManager/addnewPerson",
        element: <AddPersonPage />,
      },
      {
        path: "/resourceManager/addnewCandidate",
        element: <AddCandidatePage />,
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
        path: "/resourceManager/billing/addNewBilling/:id",
        element: <AddBillingPage id={""} />,
      },
      {
        path: "/resourceManager/pipeline/editPipeline/:id",
        element: <EditPipelinePage id={""} />,
      },

      {
        path: "/resourceManager/bench/editBench/:id",
        element: <EditBenchPage id={""} />,
      },

      {
        path: "/resourceManager/billing/editBilling/:id",
        element: <EditBillingPage id={""} />,
      },

      {
        path: "staffer",
        element: <Staffer />,
        errorElement: <ErrorPage />,
      },
      {
        path: "candidatesAllocation",
        element: <CandidatesAllocation />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default router;
