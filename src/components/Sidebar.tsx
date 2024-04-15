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

// Definir el tipo para el estado de los dropdowns
type DropdownStates = {
  [key: string]: boolean;
};

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");
  const [dropdownStates, setDropdownStates] = useState<DropdownStates>({
    "Account Manager": false,
    "Resource Manager": false,
    Staffer: false,
  });
  const [selectedSubmenu, setSelectedSubmenu] = useState("");

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleDropdown = (section: string) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleSectionClick = (section: string) => {
    setSelectedSection(section);
    setSelectedSubmenu(""); // Limpiar la selección del submenu al cambiar de sección
  };

  const handleSubmenuClick = (submenu: string) => {
    setSelectedSubmenu(submenu);
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
            selectedSection === "Account Manager"
              ? "selected-section"
              : "over:bg-gray-200"
          }`}
        >
          <div
            onClick={() => toggleDropdown("Account Manager")}
            className="flex justify-start items-center cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faHome}
              className={`text-custom-color mr-2 ${
                selectedSection === "Account Manager" ? "selected-icon" : ""
              }`}
              onClick={() => handleSectionClick("Account Manager")}
            />
            {!collapsed && (
              <span
                className={`text-custom-color cursor-pointer ${
                  selectedSection === "Account Manager" ? "selected-text" : ""
                }`}
                onClick={() => handleSectionClick("Account Manager")}
              >
                Account Manager
              </span>
            )}
            {!collapsed && (
              <FontAwesomeIcon
                icon={
                  dropdownStates[selectedSection] ? faChevronUp : faChevronDown
                }
                className={`ml-auto text-custom-color ${
                  selectedSection === "Account Manager" ? "selected-icon" : ""
                }`}
              />
            )}
          </div>
          {collapsed && dropdownStates && (
            <div className="floating-dropdown show cursor-pointer">
              <ul>
                <li className="p-2 hover:text-custom-color ">Dashboards</li>
                <li className="p-2 hover:text-custom-color ">Clients</li>
                <li className="p-2 hover:text-custom-color">Projects</li>
                <li className="p-2 hover:text-custom-color">Job Positions</li>
              </ul>
            </div>
          )}
          {/* Contenido del Sidebar */}
          {!collapsed && dropdownStates && (
            <ul className="pl-4 cursor-pointer submenus">
              <li
                className={`p-2 mb-2 relative ${
                  selectedSubmenu === "Dashboards" ? "text-blue-500" : ""
                }`}
                onClick={() => handleSubmenuClick("Dashboards")}
              >
                <span
                  className={
                    selectedSubmenu === "Dashboards"
                      ? "bullet"
                      : "bullet-not-selected"
                  }
                ></span>
                Dashboards
              </li>
              <li
                className={`p-2 mb-2 relative ${
                  selectedSubmenu === "Clients" ? "text-blue-500" : ""
                }`}
                onClick={() => handleSubmenuClick("Clients")}
              >
                <span
                  className={
                    selectedSubmenu === "Clients"
                      ? "bullet"
                      : "bullet-not-selected"
                  }
                ></span>
                Clients
              </li>
              <li
                className={`p-2 relative ${
                  selectedSubmenu === "Projects" ? "text-blue-500" : ""
                }`}
                onClick={() => handleSubmenuClick("Projects")}
              >
                <span
                  className={
                    selectedSubmenu === "Projects"
                      ? "bullet"
                      : "bullet-not-selected"
                  }
                ></span>
                Projects
              </li>
              <li
                className={`p-2 relative ${
                  selectedSubmenu === "Job Position" ? "text-blue-500" : ""
                }`}
                onClick={() => handleSubmenuClick("Job Position")}
              >
                <span
                  className={
                    selectedSubmenu === "Job Position"
                      ? "bullet"
                      : "bullet-not-selected"
                  }
                ></span>
                Job Positions
              </li>
            </ul>
          )}
        </li>

        <li
          className={`p-2 mb-4 ${
            selectedSection === "Resource Manager"
              ? "selected-section"
              : "over:bg-gray-200"
          }`}
        >
          <div
            onClick={() => toggleDropdown("Resource Manager")}
            className="flex justify-start items-center cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faHome}
              className={`text-custom-color mr-2 ${
                selectedSection === "Resource Manager" ? "selected-icon" : ""
              }`}
              onClick={() => handleSectionClick("Resource Manager")}
            />
            {!collapsed && (
              <span
                className={`text-custom-color cursor-pointer ${
                  selectedSection === "Resource Manager" ? "selected-text" : ""
                }`}
                onClick={() => handleSectionClick("Resource Manager")}
              >
                Resource Manager
              </span>
            )}
            {!collapsed && (
              <FontAwesomeIcon
                icon={
                  dropdownStates[selectedSection] ? faChevronUp : faChevronDown
                }
                className={`ml-auto text-custom-color ${
                  selectedSection === "Resource Manager" ? "selected-icon" : ""
                }`}
              />
            )}
          </div>
          {collapsed && dropdownStates && (
            <div className="floating-dropdown show cursor-pointer">
              <ul>
                <li className="p-2 hover:text-custom-color ">Dashboards</li>
                <li className="p-2 hover:text-custom-color ">Clients</li>
                <li className="p-2 hover:text-custom-color">Projects</li>
                <li className="p-2 hover:text-custom-color">Job Positions</li>
              </ul>
            </div>
          )}
          {/* Contenido del Sidebar */}
          {!collapsed && dropdownStates && (
            <ul className="pl-4 cursor-pointer submenus">
              <li
                className={`p-2 mb-2 relative ${
                  selectedSubmenu === "Dashboards Resource"
                    ? "text-blue-500"
                    : ""
                }`}
                onClick={() => handleSubmenuClick("Dashboards Resource")}
              >
                <span
                  className={
                    selectedSubmenu === "Dashboards Resource"
                      ? "bullet"
                      : "bullet-not-selected"
                  }
                ></span>
                Dashboards
              </li>
              <li
                className={`p-2 mb-2 relative ${
                  selectedSubmenu === "Clients Resource" ? "text-blue-500" : ""
                }`}
                onClick={() => handleSubmenuClick("Clients Resource")}
              >
                <span
                  className={
                    selectedSubmenu === "Clients Resource"
                      ? "bullet"
                      : "bullet-not-selected"
                  }
                ></span>
                Clients
              </li>
              <li
                className={`p-2 relative ${
                  selectedSubmenu === "Projects" ? "text-blue-500" : ""
                }`}
                onClick={() => handleSubmenuClick("Projects Resource")}
              >
                <span
                  className={
                    selectedSubmenu === "Projects Resource"
                      ? "bullet"
                      : "bullet-not-selected"
                  }
                ></span>
                Projects
              </li>
              <li
                className={`p-2 relative ${
                  selectedSubmenu === "Job Position" ? "text-blue-500" : ""
                }`}
                onClick={() => handleSubmenuClick("Job Position Resource")}
              >
                <span
                  className={
                    selectedSubmenu === "Job Position Resource"
                      ? "bullet"
                      : "bullet-not-selected"
                  }
                ></span>
                Job Positions
              </li>
            </ul>
          )}
        </li>

        <li
          className={`p-2 mb-4 ${
            selectedSection === "Staffer"
              ? "selected-section"
              : "over:bg-gray-200"
          }`}
        >
          <div
            onClick={() => toggleDropdown("Staffer")}
            className="flex justify-start items-center cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faHome}
              className={`text-custom-color mr-2 ${
                selectedSection === "Staffer" ? "selected-icon" : ""
              }`}
              onClick={() => handleSectionClick("Staffer")}
            />
            {!collapsed && (
              <span
                className={`text-custom-color cursor-pointer ${
                  selectedSection === "Staffer" ? "selected-text" : ""
                }`}
                onClick={() => handleSectionClick("Staffer")}
              >
                Staffer
              </span>
            )}
            {!collapsed && (
              <FontAwesomeIcon
                icon={
                  dropdownStates[selectedSection] ? faChevronUp : faChevronDown
                }
                className={`ml-auto text-custom-color ${
                  selectedSection === "Staffer" ? "selected-icon" : ""
                }`}
              />
            )}
          </div>
          {collapsed && dropdownStates && (
            <div className="floating-dropdown show cursor-pointer">
              <ul>
                <li className="p-2 hover:text-custom-color ">Dashboards</li>
                <li className="p-2 hover:text-custom-color ">Clients</li>
                <li className="p-2 hover:text-custom-color">Projects</li>
                <li className="p-2 hover:text-custom-color">Job Positions</li>
              </ul>
            </div>
          )}
          {/* Contenido del Sidebar */}
          {!collapsed && dropdownStates && (
            <ul className="pl-4 cursor-pointer submenus">
              <li
                className={`p-2 mb-2 relative ${
                  selectedSubmenu === "Dashboards Staffer"
                    ? "text-blue-500"
                    : ""
                }`}
                onClick={() => handleSubmenuClick("Dashboards Staffer")}
              >
                <span
                  className={
                    selectedSubmenu === "Dashboards Staffer"
                      ? "bullet"
                      : "bullet-not-selected"
                  }
                ></span>
                Dashboards
              </li>
              <li
                className={`p-2 mb-2 relative ${
                  selectedSubmenu === "Clients Staffer" ? "text-blue-500" : ""
                }`}
                onClick={() => handleSubmenuClick("Clients Staffer")}
              >
                <span
                  className={
                    selectedSubmenu === "Clients Staffer"
                      ? "bullet"
                      : "bullet-not-selected"
                  }
                ></span>
                Clients
              </li>
              <li
                className={`p-2 relative ${
                  selectedSubmenu === "Projects Staffer" ? "text-blue-500" : ""
                }`}
                onClick={() => handleSubmenuClick("Projects Staffer")}
              >
                <span
                  className={
                    selectedSubmenu === "Projects Staffer"
                      ? "bullet"
                      : "bullet-not-selected"
                  }
                ></span>
                Projects
              </li>
              <li
                className={`p-2 relative ${
                  selectedSubmenu === "Job Position Staffer"
                    ? "text-blue-500"
                    : ""
                }`}
                onClick={() => handleSubmenuClick("Job Position Staffer")}
              >
                <span
                  className={
                    selectedSubmenu === "Job Position Staffer"
                      ? "bullet"
                      : "bullet-not-selected"
                  }
                ></span>
                Job Positions
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
      <div className="absolute bottom-0 w-full flex justify-center hola">
        <button
          onClick={toggleSidebar}
          className="p-4 hover:text-custom-color-200 "
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
