import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ResourcePage from "../pages/ResurceManger/ResourcePage";
import ErrorPage from "../pages/ResurceManger/ErrorPage";
import PipelinePage from "../pages/ResurceManger/PipelinePage";

const router = createBrowserRouter([ // definimos las rutas de nuestra aplicación

    {
        path: "/", // definimos la ruta raíz
        element: <App />, // definimos el componente que se renderizará en la ruta raíz
    },
    {
        path: "/resourceManager", // definimos la ruta /products
        element: <ResourcePage />, // definimos el componente que se renderizará en la ruta /products
        errorElement: <ErrorPage />, // definimos el componente que se renderizará en caso de error
    },
    {
        path: "/accountManager", // definimos la ruta /products
        element: <ResourcePage />, // definimos el componente que se renderizará en la ruta /products
        errorElement: <ErrorPage />, // definimos el componente que se renderizará en caso de error
    },
    {
        path: "/staffer", // definimos la ruta /products
        element: <ResourcePage />, // definimos el componente que se renderizará en la ruta /products
        errorElement: <ErrorPage />, // definimos el componente que se renderizará en caso de error
    },
    {
        path: "/pipeline", // definimos la ruta /products
        element: <PipelinePage />, // definimos el componente que se renderizará en la ruta /products
        errorElement: <ErrorPage />, // definimos el componente que se renderizará en caso de error
    }


]);

export default router;