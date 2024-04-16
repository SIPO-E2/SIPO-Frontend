import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import AcountManager from "../pages/AcountManager";
import ResourceManager from "../pages/ResourceManager";
import Staffer from "../pages/Staffer";
import AccountManager from "../pages/AccountManager";
import Projects from "../pages/Projects";

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
          path: "/projects",
          element: <Projects/>,
        },
        {
            path: "/resourceManager",
            element: <div>Resource Manager</div>,
            errorElement: <ErrorPage />,
        },
        {
            path: "/staffer",
            element: <div>Staffer</div>,
            errorElement: <ErrorPage />,
        },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
