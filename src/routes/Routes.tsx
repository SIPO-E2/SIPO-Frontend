import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import AcountManager from "../pages/AcountManager";
import ResourceManager from "../pages/ResourceManager";
import Staffer from "../pages/Staffer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/accountManager",
        element: <AcountManager />,
      },
      {
        path: "/resourceManager",
        element: <ResourceManager />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/staffer",
        element: <Staffer />,
        errorElement: <ErrorPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
