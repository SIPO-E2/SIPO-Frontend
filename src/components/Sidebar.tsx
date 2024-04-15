import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInfoCircle,
  faWrench,
  faAddressBook,
  faChevronUp,
  faChevronDown,
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
      <ul className="list-unstyled">
        <li className="p-2 hover:bg-gray-100">
          <div
            onClick={toggleDropdown}
            className="flex justify-between items-center cursor-pointer"
          >
            <FontAwesomeIcon icon={faHome} /> {/* Ícono de Home */}
            {!collapsed && " Home"}
            {!collapsed && (
              <FontAwesomeIcon
                icon={dropdownOpen ? faChevronUp : faChevronDown}
              />
            )}
          </div>
          {dropdownOpen && (
            <ul className="pl-4">
              <li className="p-2 hover:bg-gray-100">Submenu 1</li>
              <li className="p-2 hover:bg-gray-100">Submenu 2</li>
              <li className="p-2 hover:bg-gray-100">Submenu 3</li>
            </ul>
          )}
        </li>
        <li className="p-2 hover:bg-gray-100 flex items-center">
          <FontAwesomeIcon icon={faInfoCircle} /> {/* Ícono de About */}
          {!collapsed && " About"}
        </li>
        <li className="p-2 hover:bg-gray-100 flex items-center">
          <FontAwesomeIcon icon={faWrench} /> {/* Ícono de Services */}
          {!collapsed && " Services"}
        </li>
        <li className="p-2 hover:bg-gray-100 flex items-center">
          <FontAwesomeIcon icon={faAddressBook} /> {/* Ícono de Contact */}
          {!collapsed && " Contact"}
        </li>
      </ul>
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
