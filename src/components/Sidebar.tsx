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
  faClipboardQuestion,
} from "@fortawesome/free-solid-svg-icons";
import "../global.css";
import EncoraLogo from "../assets/encora-logo.png";
import { NavLink } from "react-router-dom";

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
    Services: false,
    Contact: false,
  });
  const [selectedSubmenu, setSelectedSubmenu] = useState("");

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleDropdown = (section: string) => {
    setSelectedSection(section); // Seleccionar automáticamente la sección al hacer clic en el dropdown
    setDropdownStates((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleSectionClick = (section: string) => {
    setSelectedSection(section);
    setSelectedSubmenu(""); // Limpiar la selección del submenu al cambiar de sección
  };

  const handleSubmenuClick = (submenu: string, section: string) => {
    setSelectedSection(section);
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
            selectedSection === "Home"
              ? "selected-section"
              : "hover:bg-gray-200"
          }`}
        >
          <div
            onClick={() => handleSectionClick("Home")}
            className="flex justify-start items-center cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faHome}
              className={`text-custom-color mr-2 ${
                selectedSection === "Home" ? "selected-icon" : ""
              }`}
            />
            {!collapsed && (
              <span
                className={`text-custom-color cursor-pointer ${
                  selectedSection === "Home" ? "selected-text" : ""
                }`}
              >
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </span>
            )}
          </div>
        </li>
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
              icon={faAddressBook}
              className={`text-custom-color mr-2 ${
                selectedSection === "Account Manager" ? "selected-icon" : ""
              }`}
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
                  dropdownStates["Account Manager"]
                    ? faChevronUp
                    : faChevronDown
                }
                className={`ml-auto text-custom-color ${
                  selectedSection === "Account Manager" ? "selected-icon" : ""
                }`}
              />
            )}
          </div>
          {collapsed && dropdownStates["Account Manager"] && (
            <div className="floating-dropdown show cursor-pointer">
              <ul>
                <li className="p-2 hover:text-custom-color ">
                  <NavLink to="/accountManager" className="nav-link">
                    Dashboards
                  </NavLink>
                </li>
                <li className="p-2 hover:text-custom-color ">
                  <NavLink to="/accountManager" className="nav-link">
                    Clients
                  </NavLink>
                </li>
                <li className="p-2 hover:text-custom-color">
                  <NavLink to="/accountManager" className="nav-link">
                    Projects
                  </NavLink>
                </li>
                <li className="p-2 hover:text-custom-color">
                  <NavLink to="/accountManager" className="nav-link">
                    Job Positions
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
          {!collapsed && dropdownStates["Account Manager"] && (
            <ul className="pl-4 ml-4 cursor-pointer submenus">
              <li
                className={`p-2 mb-2 relative ${
                  selectedSubmenu === "Dashboards" ? "text-blue-500" : ""
                }`}
                onClick={() =>
                  handleSubmenuClick("Dashboards", "Account Manager")
                }
              >
                <span
                  className={
                    selectedSubmenu === "Dashboards"
                      ? "bullet"
                      : "bullet-not-selected"
                  }
                ></span>
                <NavLink to="/accountManager" className="nav-link">
                  Dashboards
                </NavLink>
              </li>
              <li
                className={`p-2 mb-2 relative ${
                  selectedSubmenu === "Clients" ? "text-blue-500" : ""
                }`}
                onClick={() => handleSubmenuClick("Clients", "Account Manager")}
              >
                <span
                  className={
                    selectedSubmenu === "Clients"
                      ? "bullet"
                      : "bullet-not-selected"
                  }
                ></span>
                <NavLink to="/accountManager" className="nav-link">
                  Clients
                </NavLink>
              </li>
              <li
                className={`p-2 relative ${
                  selectedSubmenu === "Projects" ? "text-blue-500" : ""
                }`}
                onClick={() =>
                  handleSubmenuClick("Projects", "Account Manager")
                }
              >
                <span
                  className={
                    selectedSubmenu === "Projects"
                      ? "bullet"
                      : "bullet-not-selected"
                  }
                ></span>
                <NavLink to="/accountManager" className="nav-link">
                  Projects
                </NavLink>
              </li>
              <li
                className={`p-2 relative ${
                  selectedSubmenu === "Job Position" ? "text-blue-500" : ""
                }`}
                onClick={() =>
                  handleSubmenuClick("Job Position", "Account Manager")
                }
              >
                <span
                  className={
                    selectedSubmenu === "Job Position"
                      ? "bullet"
                      : "bullet-not-selected"
                  }
                ></span>
                <NavLink to="/accountManager" className="nav-link">
                  Job Positions
                </NavLink>
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
              icon={faInfoCircle}
              className={`text-custom-color mr-2 ${
                selectedSection === "Resource Manager" ? "selected-icon" : ""
              }`}
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
                  dropdownStates["Resource Manager"]
                    ? faChevronUp
                    : faChevronDown
                }
                className={`ml-auto text-custom-color ${
                  selectedSection === "Resource Manager" ? "selected-icon" : ""
                }`}
              />
            )}
          </div>
          {collapsed && dropdownStates["Resource Manager"] && (
            <div className="floating-dropdown2 show cursor-pointer">
              <ul>
                <li className="p-2 hover:text-custom-color ">
                  <NavLink to="/resourceManager" className="nav-link">
                    Dashboards
                  </NavLink>
                  <NavLink to="/resourceManager" className="nav-link">
                    Home
                  </NavLink>
                </li>
                <li className="p-2 hover:text-custom-color ">
                  <NavLink to="/resourceManager" className="nav-link">
                    Dashboards
                  </NavLink>
                </li>
                <li className="p-2 hover:text-custom-color">
                  <NavLink to="/resourceManager" className="nav-link">
                    Work Force
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
          {!collapsed && dropdownStates["Resource Manager"] && (
            <ul className="pl-4 ml-4 cursor-pointer submenus">
              <li
                className={`p-2 mb-2 relative ${
                  selectedSubmenu === "Resource Home" ? "text-blue-500" : ""
                }`}
                onClick={() =>
                  handleSubmenuClick("Resource Home", "Resource Manager")
                }
              >
                <span
                  className={
                    selectedSubmenu === "Resource Home"
                      ? "bullet"
                      : "bullet-not-selected"
                  }
                ></span>
                <NavLink to="/resourceManager" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li
                className={`p-2 mb-2 relative ${
                  selectedSubmenu === "Resource Dashboards"
                    ? "text-blue-500"
                    : ""
                }`}
                onClick={() =>
                  handleSubmenuClick("Resource Dashboards", "Resource Manager")
                }
              >
                <span
                  className={
                    selectedSubmenu === "Resource Dashboards"
                      ? "bullet"
                      : "bullet-not-selected"
                  }
                ></span>
                <NavLink to="/resourceManager" className="nav-link">
                  Dashboards
                </NavLink>
              </li>
              <li
                className={`p-2 relative ${
                  selectedSubmenu === "Resource Work Force"
                    ? "text-blue-500"
                    : ""
                }`}
                onClick={() =>
                  handleSubmenuClick("Resource Work Force", "Resource Manager")
                }
              >
                <span
                  className={
                    selectedSubmenu === "Resource Work Force"
                      ? "bullet"
                      : "bullet-not-selected"
                  }
                ></span>
                <NavLink to="/resourceManager" className="nav-link">
                  Work
                </NavLink>
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
              icon={faClipboardQuestion}
              className={`text-custom-color mr-2 ${
                selectedSection === "Staffer" ? "selected-icon" : ""
              }`}
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
                icon={dropdownStates["Staffer"] ? faChevronUp : faChevronDown}
                className={`ml-auto text-custom-color ${
                  selectedSection === "Staffer" ? "selected-icon" : ""
                }`}
              />
            )}
          </div>
          {collapsed && dropdownStates["Staffer"] && (
            <div className="floating-dropdown3 show cursor-pointer">
              <ul>
                <li className="p-2 hover:text-custom-color ">Home</li>
                <li className="p-2 hover:text-custom-color ">Dashboards</li>
                <li className="p-2 hover:text-custom-color">Work Force</li>
                <li className="p-2 hover:text-custom-color">Job Positions</li>
              </ul>
            </div>
          )}
          {!collapsed && dropdownStates["Staffer"] && (
            <ul className="pl-4 ml-4 cursor-pointer submenus">
              <li
                className={`p-2 mb-2 relative ${
                  selectedSubmenu === "Staffer Home" ? "text-blue-500" : ""
                }`}
                onClick={() => handleSubmenuClick("Staffer Home", "Staffer")}
              >
                <span
                  className={
                    selectedSubmenu === "Staffer Home"
                      ? "bullet"
                      : "bullet-not-selected"
                  }
                ></span>
                <NavLink to="/staffer" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li
                className={`p-2 mb-2 relative ${
                  selectedSubmenu === "Staffer Dashboards"
                    ? "text-blue-500"
                    : ""
                }`}
                onClick={() =>
                  handleSubmenuClick("Staffer Dashboards", "Staffer")
                }
              >
                <span
                  className={
                    selectedSubmenu === "Staffer Dashboards"
                      ? "bullet"
                      : "bullet-not-selected"
                  }
                ></span>
                <NavLink to="/staffer" className="nav-link">
                  Dashboards
                </NavLink>
              </li>
              <li
                className={`p-2 relative ${
                  selectedSubmenu === "Staffer Work Force"
                    ? "text-blue-500"
                    : ""
                }`}
                onClick={() =>
                  handleSubmenuClick("Staffer Work Force", "Staffer")
                }
              >
                <span
                  className={
                    selectedSubmenu === "Staffer Work Force"
                      ? "bullet"
                      : "bullet-not-selected"
                  }
                ></span>
                <NavLink to="/staffer" className="nav-link">
                  Work Force
                </NavLink>
              </li>
              <li
                className={`p-2 relative ${
                  selectedSubmenu === "Staffer Job Positions"
                    ? "text-blue-500"
                    : ""
                }`}
                onClick={() =>
                  handleSubmenuClick("Staffer Job Positions", "Staffer")
                }
              >
                <span
                  className={
                    selectedSubmenu === "Staffer Job Positions"
                      ? "bullet"
                      : "bullet-not-selected"
                  }
                ></span>
                <NavLink to="/staffer" className="nav-link">
                  Job Positions
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
      <div className="absolute bottom-0 w-full flex justify-center collapsed-margin">
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
