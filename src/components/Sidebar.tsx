import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInfoCircle,
  faWrench,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";
import "../global.css";

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div
      className={`transition-width h-full shadow-md bg-white absolute ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="p-5">Logo</div>
      <ul className="list-unstyled">{/* Tus otros componentes aquí */}</ul>
      <div className="absolute bottom-0 w-full">
        <button
          onClick={toggleSidebar}
          className="w-full p-4 hover:bg-gray-200"
        >
          {collapsed ? "Expand" : "Collapse"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
