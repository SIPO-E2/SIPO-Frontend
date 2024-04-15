import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";

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
