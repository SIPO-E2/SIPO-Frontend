import React from "react";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom"
import "./global.css";

function App() {
  return (
    <div className="flex min-h-screen min-w-screen flex-row bg-gray-100 text-gray-800">
      <Sidebar />
      <main className="main flex flex-grow flex-col transition-all duration-150 ease-in md:ml-0 ll">
        <div className=" h-full bg-white text-center font-bold shadow-md">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default App;