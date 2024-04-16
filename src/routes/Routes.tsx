import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import AccountManager from "../pages/AccountManager";
import Projects from "../pages/Projects";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/accountManager",
            element: <AccountManager />,
            errorElement: <ErrorPage />,
        },

        {
          path: "/projects",
          element: <Projects />,
          errorElement: <ErrorPage />,
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
