import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom"
import "./global.css";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (

    <div className="flex min-h-screen min-w-screen flex-row bg-gray-100 text-gray-800">
      <Sidebar />
      <main className="main flex flex-grow flex-col transition-all duration-150 ease-in md:ml-0 ll ">
      <div className="h-full bg-white font-bold shadow-md overflow-y-auto max-h-screen">
      <Outlet />
    </div>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;