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
      className={`transition-width h-full shadow-md bg-white absolute p-3 ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      <div className="flex items-center justify-center mb-4">
        <img
          src={EncoraLogo}
          alt="Encora Logo"
          className={collapsed ? "logo-small" : "logo-large"}
        />
      </div>
      <ul className="list-unstyled">
        <li className="p-2 hover:text-custom-color">
          <div
            onClick={toggleDropdown}
            className="flex justify-start items-center cursor-pointer"
          >
            <FontAwesomeIcon icon={faHome} className="text-custom-color mr-2" />
            {!collapsed && <span className="text-custom-color">Home</span>}
            {!collapsed && (
              <FontAwesomeIcon
                icon={dropdownOpen ? faChevronUp : faChevronDown}
                className="ml-auto text-custom-color"
              />
            )}
          </div>
          {collapsed && dropdownOpen && (
            <div className="floating-dropdown show">
              <ul>
                <li className="p-2 hover text-custom-color">Submenu 1</li>
                <li className="p-2 hover text-custom-color">Submenu 2</li>
                <li className="p-2 hover text-custom-color">Submenu 3</li>
              </ul>
            </div>
          )}
          {!collapsed && dropdownOpen && (
            <ul className="pl-4">
              <li className="p-2 hover text-custom-color">Submenu 1</li>
              <li className="p-2 hover text-custom-color">Submenu 2</li>
              <li className="p-2 hover text-custom-color">Submenu 3</li>
            </ul>
          )}
        </li>
        <li className="p-2 hover:text-custom-color flex items-center justify-start">
          <FontAwesomeIcon
            icon={faInfoCircle}
            className="text-custom-color mr-2"
          />
          {!collapsed && <span className="text-custom-color">About</span>}
        </li>
        <li className="p-2 hover:text-custom-color flex items-center justify-start">
          <FontAwesomeIcon icon={faWrench} className="text-custom-color mr-2" />
          {!collapsed && <span className="text-custom-color">Services</span>}
        </li>
        <li className="p-2 hover:text-custom-color flex items-center justify-start">
          <FontAwesomeIcon
            icon={faAddressBook}
            className="text-custom-color mr-2"
          />
          {!collapsed && <span className="text-custom-color">Contact</span>}
        </li>
      </ul>
      <div className="absolute bottom-0 w-full">
        <button
          onClick={toggleSidebar}
          className="w-full p-4 hover:text-custom-color-200"
        >
          <FontAwesomeIcon
            icon={collapsed ? faAngleDoubleRight : faAngleDoubleLeft}
            className="text-custom-color"
          />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
