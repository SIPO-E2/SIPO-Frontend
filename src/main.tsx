import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />
);
