import React from "react";
import "../../../Clients.css";

const Clients = () => {
  return (
    <div className="flex flex-col justify-center items-center w-90 mx-auto mt-10 mb-0">
      {/* Header Section */}
      <div className="header-section w-full text-center mb-4">
        <h1 className="text-2xl font-bold">Clients</h1>
        <div className="right-section flex justify-end items-center space-x-2">
          <button className="create-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create Client
          </button>
          <div className="search-sort-section flex items-center space-x-2 bg-white border border-gray-300 rounded-lg p-2 shadow-sm">
            <span className="text-gray-500">🔍</span>
            <input
              className="flex-grow outline-none placeholder-gray-500"
              type="text"
              placeholder="Search candidates"
            />
            <button className="flex items-center space-x-1 border-l border-gray-300 pl-2 pr-2 text-gray-700">
              <span>🗂️</span>
              <span>Sort</span>
              <span>▼</span>
            </button>
          </div>
        </div>
      </div>

      {/* Red Container */}
      <div className="flex justify-center items-center w-full h-[1500px] bg-red-500">
        {/* Content */}
      </div>
    </div>
  );
};

export default Clients;
