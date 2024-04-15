import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import ResourcePage from "../pages/ResourceManger/ResourcePage";
import PipelinePage from "../pages/ResourceManger/PipelinePage";
import BenchPage from "../pages/ResourceManger/BenchPage";
import BillingPage from "../pages/ResourceManger/BillingPage";
import Dashboard from "../pages/ResourceManger/Dashboard";
import AddPipelinegPage from "../pages/ResourceManger/AddPipelinePage";
import AddBenchPage from "../pages/ResourceManger/AddBenchPage";
import AddBillingPage from "../pages/ResourceManger/AddBillingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/accountManager",
        element: <div>Account Manager</div>,
      },
    
      {
        path: "/staffer",
        element: <div>Staffer</div>,
        errorElement: <ErrorPage />,
      },
    ],
    errorElement: <ErrorPage />,

    
  },

  //ResurceManger Routes
  {
    path: "/resourceManager",
    element: <ResourcePage />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/pipeline",
    element: <PipelinePage />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/billing",
    element: <BillingPage />,
    errorElement: <ErrorPage />,

  },

  {
    path: "/bench",
    element: <BenchPage />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/billing",
    element: <BillingPage />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
  },

  {
    path: "/addNewPipeline",
    element: <AddPipelinegPage />,
  },

  {
    path: "/addNewBench",
    element: <AddBenchPage />,
  },

  {
    path: "/addNewBilling",
    element: <AddBillingPage />,
  },

]);

export default router;
