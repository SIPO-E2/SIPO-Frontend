import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInfoCircle,
  faWrench,
  faAddressBook,
  faChevronUp,
  faChevronDown,
  faAngleDoubleRight,
  faAngleDoubleLeft,
} from "@fortawesome/free-solid-svg-icons";
import "../global.css";
import EncoraLogo from "../assets/encora-logo.png";

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
        collapsed ? "w-20" : "w-72"
      }`}
    >
      <div className="p-4 flex items-center">
        <img
          src={EncoraLogo}
          alt="Encora Logo"
          className={collapsed ? "logo-small" : "logo-large"}
        />
      </div>
      <ul className="list-unstyled">
        <li className="p-2 hover:bg-gray-100">
          <div
            onClick={toggleDropdown}
            className="flex justify-start items-center cursor-pointer"
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" />{" "}
            {!collapsed && "Home"}
            {!collapsed && (
              <FontAwesomeIcon
                icon={dropdownOpen ? faChevronUp : faChevronDown}
                className="ml-auto"
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
        <li className="p-2 hover:bg-gray-100 flex items-center justify-start">
          <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
          {!collapsed && "About"}
        </li>
        <li className="p-2 hover:bg-gray-100 flex items-center justify-start">
          <FontAwesomeIcon icon={faWrench} className="mr-2" />
          {!collapsed && "Services"}
        </li>
        <li className="p-2 hover:bg-gray-100 flex items-center justify-start">
          <FontAwesomeIcon icon={faAddressBook} className="mr-2" />
          {!collapsed && "Contact"}
        </li>
      </ul>
      <div className="absolute bottom-0 w-full">
        <button
          onClick={toggleSidebar}
          className="w-full p-4 hover:bg-gray-200"
        >
          <FontAwesomeIcon
            icon={collapsed ? faAngleDoubleRight : faAngleDoubleLeft}
          />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
