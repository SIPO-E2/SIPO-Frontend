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
import "./SidebarStyles/SidebarStyles.css";
import JobBlue from "./SidebarStyles/sidebarIcons/job_blue.svg";
import JobGray from "./SidebarStyles/sidebarIcons/job_gray.svg";
import ResourceBlue from "./SidebarStyles/sidebarIcons/resource_blue.svg";
import ResourceGray from "./SidebarStyles/sidebarIcons/resource_gray.svg";
import StafferBlue from "./SidebarStyles/sidebarIcons/staffer_blue.svg";
import StafferGray from "./SidebarStyles/sidebarIcons/staffer_gray.svg";
import AdminBlue from "./SidebarStyles/sidebarIcons/admin_blue.svg";
import AdminGray from "./SidebarStyles/sidebarIcons/admin_gray.svg";
import HomeBlue from "./SidebarStyles/sidebarIcons/home_blue.svg";
import HomeGray from "./SidebarStyles/sidebarIcons/home_gray.svg";

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
      className={`transition-width h-full shadow-md bg-white min-h-screen relative p-3 sidebar-height ${
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
      <ul className="list-unstyled sidebar-content">
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
            <NavLink to="/">
              {selectedSection === "Home" ? (
                <img src={HomeBlue} className="sidebar-icon-all" />
              ) : (
                <img src={HomeGray} className="sidebar-icon-all" />
              )}
            </NavLink>
            {!collapsed && (
              <span
                className={`text-custom-color cursor-pointer ${
                  selectedSection === "Home" ? "selected-text" : ""
                }`}
              >
                <NavLink
                  to="/"
                  className="nav-link"
                  style={{ textDecoration: "none" }}
                >
                  Home
                </NavLink>
              </span>
            )}
          </div>
        </li>
        {!collapsed && <h4 className="sections-title-sidebar">MANAGEMENT</h4>}
        {/* ------------------------------ Admin Section ------------------------------ */}
        <li
          className={`p-2 mb-4 ${
            selectedSection === "Admin"
              ? "selected-section"
              : "over:bg-gray-200"
          }`}
        >
          <div
            onClick={() => toggleDropdown("Admin")}
            className="flex justify-start items-center cursor-pointer"
          >
            {selectedSection === "Admin" ? (
              <img src={AdminBlue} className="sidebar-icon-all" />
            ) : (
              <img src={AdminGray} className="sidebar-icon-all" />
            )}
            {!collapsed && (
              <span
                className={`text-custom-color cursor-pointer ${
                  selectedSection === "Admin" ? "selected-text" : ""
                }`}
                onClick={() => handleSectionClick("Admin")}
              >
                Admin
              </span>
            )}
            {!collapsed && (
              <FontAwesomeIcon
                icon={dropdownStates["Admin"] ? faChevronUp : faChevronDown}
                className={`ml-auto text-custom-color ${
                  selectedSection === "Admin" ? "selected-icon" : ""
                }`}
              />
            )}
          </div>
          {collapsed && dropdownStates["Admin"] && (
            <div className="floating-dropdown-sidebar show cursor-pointer">
              <ul>
                <li className="p-2 hover:text-custom-color">
                  <NavLink
                    to="/admin/roles"
                    className="nav-link"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Roles
                  </NavLink>
                </li>
                <li className="p-2 hover:text-custom-color">
                  <NavLink
                    to="/admin/users"
                    className="nav-link"
                    style={{ textDecoration: "none" }}
                  >
                    Users
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
          {!collapsed && dropdownStates["Admin"] && (
            <ul className="pl-4 ml-4 cursor-pointer submenus">
              <li
                className={`p-2 relative ${
                  selectedSubmenu === "Roles" ? "text-blue-500" : ""
                }`}
                onClick={() => handleSubmenuClick("Roles", "Admin")}
              >
                <span
                  className={
                    selectedSubmenu === "Roles"
                      ? "bullet"
                      : "bullet-not-selected"
                  }
                ></span>
                <NavLink
                  to="/admin/roles"
                  className="nav-link"
                  style={{ textDecoration: "none" }}
                >
                  Roles
                </NavLink>
              </li>
              <li
                className={`p-2 relative ${
                  selectedSubmenu === "Users" ? "text-blue-500" : ""
                }`}
                onClick={() => handleSubmenuClick("Users", "Admin")}
              >
                <span
                  className={
                    selectedSubmenu === "Users"
                      ? "bullet"
                      : "bullet-not-selected"
                  }
                ></span>
                <NavLink
                  to="/admin/users"
                  className="nav-link"
                  style={{ textDecoration: "none" }}
                >
                  Users
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        {!collapsed && <h4 className="sections-title-sidebar">OVERVIEW</h4>}
        {/* ------------------------------ Account Manager Section ------------------------------ */}
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
            {selectedSection === "Account Manager" ? (
              <img src={JobBlue} className="sidebar-icon-all" />
            ) : (
              <img src={JobGray} className="sidebar-icon-all" />
            )}

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
            <div className="floating-dropdown-sidebar show cursor-pointer">
              <ul>
                <li className="p-2 hover:text-custom-color ">
                  <NavLink
                    to="/accountManager/dashboards"
                    className="nav-link"
                    style={{ textDecoration: "none" }}
                  >
                    Dashboards
                  </NavLink>
                </li>
                <li className="p-2 hover:text-custom-color ">
                  <NavLink
                    to="/accountManager/clients"
                    className="nav-link"
                    style={{ textDecoration: "none" }}
                  >
                    Clients
                  </NavLink>
                </li>
                <li className="p-2 hover:text-custom-color">
                  <NavLink
                    to="/accountManager/projects"
                    className="nav-link"
                    style={{ textDecoration: "none" }}
                  >
                    Projects
                  </NavLink>
                </li>
                <li className="p-2 hover:text-custom-color">
                  <NavLink
                    to="/accountManager/jobPositions"
                    className="nav-link"
                    style={{ textDecoration: "none" }}
                  >
                    Job Positions
                  </NavLink>
                </li>
                <li className="p-2 hover:text-custom-color">
                  <NavLink
                    to="/accountManager/RolesAndUsers"
                    className="nav-link"
                    style={{ textDecoration: "none" }}
                  >
                    Roles and Associated Users
                  </NavLink>
                </li>
                <li className="p-2 hover:text-custom-color">
                  <NavLink
                    to="/accountManager/UserClient"
                    className="nav-link"
                    style={{ textDecoration: "none" }}
                  >
                    User Client List
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
                <NavLink
                  to="/accountManager/dashboards"
                  className="nav-link"
                  style={{ textDecoration: "none" }}
                >
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
                <NavLink
                  to="/accountManager/clients"
                  className="nav-link"
                  style={{ textDecoration: "none" }}
                >
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
                <NavLink
                  to="/accountManager/projects"
                  className="nav-link"
                  style={{ textDecoration: "none" }}
                >
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
                <NavLink
                  to="/accountManager/jobPositions"
                  className="nav-link"
                  style={{ textDecoration: "none" }}
                >
                  Job Positions
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        {/* ------------------------------ Resource Manager Section ------------------------------ */}
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
            {selectedSection === "Resource Manager" ? (
              <img src={ResourceBlue} className="sidebar-icon-all" />
            ) : (
              <img src={ResourceGray} className="sidebar-icon-all" />
            )}
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
            <div className="floating-dropdown-sidebar2 show cursor-pointer">
              <ul>
                <li className="p-2 hover:text-custom-color ">
                  <NavLink to="/resourceManager/dashboard" className="nav-link">
                    Dashboards
                  </NavLink>
                </li>
                <li className="p-2 hover:text-custom-color">
                  <NavLink
                    to="/resourceManager"
                    className="nav-link"
                    style={{ textDecoration: "none" }}
                  >
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
                <NavLink to="/resourceManager/dashboard" className="nav-link">
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
                <NavLink
                  to="/resourceManager"
                  className="nav-link"
                  style={{ textDecoration: "none" }}
                >
                  Work Force
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        {/* ------------------------------ Staffer Section ------------------------------ */}
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
            {selectedSection === "Staffer" ? (
              <img src={StafferBlue} className="sidebar-icon-all" />
            ) : (
              <img src={StafferGray} className="sidebar-icon-all" />
            )}
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
            <div className="floating-dropdown-sidebar3 show cursor-pointer">
              <ul>
                <li className="p-2 hover:text-custom-color ">
                  <NavLink
                    to="/staffer"
                    className="nav-link"
                    style={{ textDecoration: "none" }}
                  >
                    Dashboards
                  </NavLink>
                </li>
                <li className="p-2 hover:text-custom-color">
                  <NavLink
                    to="/staffer"
                    className="nav-link"
                    style={{ textDecoration: "none" }}
                  >
                    Job Positions
                  </NavLink>
                </li>
                <li className="p-2 hover:text-custom-color">
                  {" "}
                  <NavLink
                    to="/CandidatesAllocation"
                    className="nav-link"
                    style={{ textDecoration: "none" }}
                  >
                    Candidates allocation
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
          {!collapsed && dropdownStates["Staffer"] && (
            <ul className="pl-4 ml-4 cursor-pointer submenus">
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
                <NavLink
                  to="/staffer"
                  className="nav-link"
                  style={{ textDecoration: "none" }}
                >
                  Dashboards
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
                <NavLink
                  to="/staffer"
                  className="nav-link"
                  style={{ textDecoration: "none" }}
                >
                  Job Positions
                </NavLink>
              </li>
              <li
                className={`p-2 relative ${
                  selectedSubmenu === "Staffer Candidates Allocation"
                    ? "text-blue-500"
                    : ""
                }`}
                onClick={() =>
                  handleSubmenuClick("Staffer Candidates Allocation", "Staffer")
                }
              >
                <span
                  className={
                    selectedSubmenu === "Staffer Candidates Allocation"
                      ? "bullet"
                      : "bullet-not-selected"
                  }
                ></span>
                <NavLink
                  to="/CandidatesAllocation"
                  className="nav-link"
                  style={{ textDecoration: "none" }}
                >
                  Candidates allocation
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
