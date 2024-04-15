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
  const [selectedSection, setSelectedSection] = useState("");

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSectionClick = (section: string) => {
    setSelectedSection(section);
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
        <li
          className={`p-2 mb-4 ${
            selectedSection === "Home" ? "selected-section" : "over:bg-gray-200"
          }`}
        >
          <div
            onClick={toggleDropdown}
            className="flex justify-start items-center cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faHome}
              className={`text-custom-color mr-2 ${
                selectedSection === "Home" ? "selected-icon" : ""
              }`}
              onClick={() => handleSectionClick("Home")}
            />
            {!collapsed && (
              <span
                className={`text-custom-color cursor-pointer ${
                  selectedSection === "Home" ? "selected-text" : ""
                }`}
                onClick={() => handleSectionClick("Home")}
              >
                Home
              </span>
            )}
            {!collapsed && (
              <FontAwesomeIcon
                icon={dropdownOpen ? faChevronUp : faChevronDown}
                className={`ml-auto text-custom-color ${
                  selectedSection === "Home" ? "selected-icon" : ""
                }`}
              />
            )}
          </div>
          {collapsed && dropdownOpen && (
            <div className="floating-dropdown show cursor-pointer">
              <ul>
                <li className="p-2 hover:text-custom-color ">Submenu 1</li>
                <li className="p-2 hover:text-custom-color ">Submenu 2</li>
                <li className="p-2 hover:text-custom-color">Submenu 3</li>
              </ul>
            </div>
          )}
          {!collapsed && dropdownOpen && (
            <ul className="pl-4 cursor-pointer">
              <li className="p-2 hover:text-custom-color mb-2 relative">
                <span className="bullet"></span>Submenu 1
              </li>
              <li className="p-2 hover:text-custom-color mb-2 relative">
                <span className="bullet"></span>Submenu 2
              </li>
              <li className="p-2 hover:text-custom-color relative">
                <span className="bullet"></span>Submenu 3
              </li>
            </ul>
          )}
        </li>

        <li
          className={`p-2 mb-4  flex items-center justify-start ${
            selectedSection === "About"
              ? "selected-section"
              : "hover:bg-gray-200"
          }`}
        >
          <FontAwesomeIcon
            icon={faInfoCircle}
            className={`text-custom-color mr-2 ${
              selectedSection === "About" ? "selected-icon" : ""
            }`}
            onClick={() => handleSectionClick("About")}
          />
          {!collapsed && (
            <span
              className={`text-custom-color cursor-pointer ${
                selectedSection === "About" ? "selected-text" : ""
              }`}
              onClick={() => handleSectionClick("About")}
            >
              About
            </span>
          )}
        </li>

        <li
          className={`p-2 mb-4  flex items-center justify-start ${
            selectedSection === "Services"
              ? "selected-section"
              : "hover:bg-gray-200"
          }`}
        >
          <FontAwesomeIcon
            icon={faWrench}
            className={`text-custom-color mr-2 ${
              selectedSection === "Services" ? "selected-icon" : ""
            }`}
            onClick={() => handleSectionClick("Services")}
          />
          {!collapsed && (
            <span
              className={`text-custom-color cursor-pointer ${
                selectedSection === "Services" ? "selected-text" : ""
              }`}
              onClick={() => handleSectionClick("Services")}
            >
              Services
            </span>
          )}
        </li>

        <li
          className={`p-2 mb-4  items-center justify-start ${
            selectedSection === "Contact"
              ? "selected-section"
              : "hover:bg-gray-200 flex"
          }`}
        >
          <FontAwesomeIcon
            icon={faAddressBook}
            className={`text-custom-color mr-2 ${
              selectedSection === "Contact" ? "selected-icon" : ""
            }`}
            onClick={() => handleSectionClick("Contact")}
          />
          {!collapsed && (
            <span
              className={`text-custom-color cursor-pointer ${
                selectedSection === "Contact" ? "selected-text" : ""
              }`}
              onClick={() => handleSectionClick("Contact")}
            >
              Contact
            </span>
          )}
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
