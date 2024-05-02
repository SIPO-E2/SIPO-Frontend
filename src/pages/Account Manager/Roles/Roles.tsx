// Ejemplo de un componente que lista los roles
import React, { useEffect, useState } from "react";
import { useApisStore } from "../../../store/apiStore";
import "./Styles/Roles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faChevronUp,
  faChevronDown,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import RolesList from "./RolesList";
import RolesPagination from "../../../components/RolesPagination";
import XIcon from "./RolesIcons/X.svg";
import DeleteRole from "./DeleteRole";
import { Link } from "react-router-dom";
/* --------------------- IMPORTING DATE LIBRARY --------------------- */
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // Estilos principales
import "react-date-range/dist/theme/default.css"; // Tema por defecto
import { format } from "date-fns";

interface DateRange {
  startDate?: Date; // La fecha de inicio puede ser Date o undefined
  endDate?: Date; // La fecha de finalización puede ser Date o undefined
  key: string;
}

interface SelectedRole {
  id: string | null;
  name: string;
}

interface Role {
  id: string;
  name: string;
  users: User[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  activeDB: boolean;
}

const Roles = () => {
  /* --------------------- STATES --------------------- */

  const { roles, totalRoles, fetchRoles, setRoles } = useApisStore((state) => ({
    roles: state.roles,
    totalRoles: state.totalRoles,
    fetchRoles: state.fetchRoles,
    setRoles: state.setRoles,
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, setState] = useState<DateRange[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const savedRange = JSON.parse(
    localStorage.getItem("selectedRange") ?? ""
  ) || {
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: "selection",
  };

  const [selectedRange, setSelectedRange] = useState(() => {
    // Intenta obtener el rango guardado o usa uno por defecto
    const savedRange = localStorage.getItem("selectedRange");
    return savedRange
      ? JSON.parse(savedRange)
      : {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: "selection",
        };
  });

  const [dateRangeText, setDateRangeText] = useState(() => {
    // Intenta crear el texto basado en el rango guardado o establece uno por defecto
    if (selectedRange.startDate && selectedRange.endDate) {
      return `${format(selectedRange.startDate, "MMM dd, yyyy")} - ${format(
        selectedRange.endDate,
        "MMM dd, yyyy"
      )}`;
    }
    return "Select Date";
  });

  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Define additional state hooks for formatted dates
  const [formattedStart, setFormattedStart] = useState("");
  const [formattedEnd, setFormattedEnd] = useState("");

  /* --------------------- FETCHING ROLES --------------------- */

  useEffect(() => {
    if (selectedRange.startDate && selectedRange.endDate) {
      // Format dates and update state immediately when selectedRange changes
      setFormattedStart(format(selectedRange.startDate, "yyyy-MM-dd"));
      setFormattedEnd(format(selectedRange.endDate, "yyyy-MM-dd"));
    }
  }, [selectedRange]); // Depend on selectedRange

  useEffect(() => {
    fetchRoles(
      currentPage,
      itemsPerPage,
      searchName,
      formattedStart,
      formattedEnd,
      true // activeDB
    );
  }, [
    currentPage,
    itemsPerPage,
    searchName,
    formattedStart,
    formattedEnd,
    fetchRoles,
  ]);

  /* --------------------- MODAL --------------------- */

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  /* --------------------- DATE RANGE --------------------- */

  const applyDateSelection = () => {
    if (selectedRange.startDate && selectedRange.endDate) {
      const newDateRangeText = `${format(
        selectedRange.startDate,
        "MMM dd, yyyy"
      )} - ${format(selectedRange.endDate, "MMM dd, yyyy")}`;
      setDateRangeText(newDateRangeText);
      toggleModal(); // Closing modal here does not affect state immediately used in useEffect
    }
  };

  useEffect(() => {
    // Actualiza localStorage cuando selectedRange cambia
    localStorage.setItem("selectedRange", JSON.stringify(selectedRange));

    const formattedStart = selectedRange.startDate
      ? format(selectedRange.startDate, "yyyy-MM-dd")
      : "";
    const formattedEnd = selectedRange.endDate
      ? format(selectedRange.endDate, "yyyy-MM-dd")
      : "";
    setFormattedStart(formattedStart);
    setFormattedEnd(formattedEnd);

    // Vuelve a buscar roles cada vez que cambian los estados importantes
    fetchRoles(
      currentPage,
      itemsPerPage,
      searchName,
      formattedStart,
      formattedEnd
    );
  }, [selectedRange, currentPage, itemsPerPage, searchName]);

  /* --------------------- REMOVE DATE FILTER --------------------- */

  const removeDateFilter = () => {
    setSelectedRange({
      startDate: undefined,
      endDate: undefined,
      key: "selection",
    });
    localStorage.setItem(
      "selectedRange",
      JSON.stringify({
        startDate: undefined,
        endDate: undefined,
        key: "selection",
      })
    );
    setDateRangeText("Select Date");
    setFormattedStart("");
    setFormattedEnd("");
    fetchRoles(currentPage, itemsPerPage, searchName, "", ""); // Refetch without dates
  };

  /* --------------------- Settings pop up --------------------- */

  const [openSettingsIds, setOpenSettingsIds] = useState(new Set<string>());

  const toggleSettings = (id: string) => {
    setOpenSettingsIds(
      (prev) =>
        new Set(
          prev.has(id) ? [...prev].filter((item) => item !== id) : [...prev, id]
        )
    );
  };

  /* --------------------- Delete pop up ---------------------*/

  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<SelectedRole>({
    id: null,
    name: "",
  });

  const handleOpenDeletePopup = (roleId: string, roleName: string) => {
    setSelectedRole({ id: roleId, name: roleName });
    setDeletePopupOpen(true);
  };

  const handleCloseDeletePopup = () => {
    setDeletePopupOpen(false);
    setSelectedRole({ id: null, name: "" });
  };

  /* --------------------- Render Deleting --------------------- */

  // Function to handle the deletion of a client
  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter((role) => role.id !== roleId));
    setDeletePopupOpen(false); // Close the popup after deletion
  };

  return (
    <div className="main-roles">
      <div className="body-content-roles">
        <div className="roles-top-section ">
          <h4 className="section-title-roles">Roles</h4>

          <Link to="/accountManager/roles/new">
            <button className="add-button-roles">+ Add</button>
          </Link>
        </div>

        <div className="roles-top-section">
          <div className="roles-search-section">
            <FontAwesomeIcon icon={faSearch} className="roles-search-icon" />
            <input
              className="roles-search-input"
              type="text"
              placeholder="Search ..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>

          <div className="roles-top-filters">
            <p onClick={toggleModal}>{dateRangeText}</p>
            <div onClick={toggleModal}>
              <FontAwesomeIcon
                icon={isModalOpen ? faChevronUp : faChevronDown}
                className="display-icon-roles"
              />
            </div>
          </div>

          {isModalOpen && (
            <div className="modal-roles">
              <div className="modal-content-roles">
                <DateRangePicker
                  key={selectedRange.startDate ? "active" : "reset"} // Change key to force re-render
                  onChange={(item: RangeKeyDict) => {
                    const {
                      startDate,
                      endDate,
                      key = "selection",
                    } = item.selection;
                    if (startDate && endDate) {
                      const newRange: DateRange = { startDate, endDate, key };
                      setState([newRange]);
                      setSelectedRange(newRange);
                    }
                  }}
                  months={2}
                  ranges={state}
                  direction="horizontal"
                />

                <div className="calendar-button-container">
                  <button
                    onClick={toggleModal}
                    className="cancel-button-roles-list"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={applyDateSelection}
                    className="apply-button-roles-list"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {dateRangeText !== "Select Date" && (
          <div className="mid-left-section-roles">
            <p className="results-text-roles">
              <span className="results-text-bold-roles">{totalRoles}</span>{" "}
              results found
            </p>
            <div className="date-labels-container-roles">
              <div className="date-container-roles">
                <p className="date-title-text-roles">Date:</p>
                <div className="date-range-container-black-roles">
                  <p className="date-range-text-black-roles">{dateRangeText}</p>
                  <img
                    onClick={removeDateFilter}
                    src={XIcon}
                    alt="X"
                    className="x-icon-roles"
                  />
                </div>
              </div>
              <div className="trash-container-roles" onClick={removeDateFilter}>
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="trash-icon-roles"
                />
                <p className="clear-text-roles">Clear</p>
              </div>
            </div>
          </div>
        )}

        <div className="table-header-roles">
          <div className="table-header-left-roles">
            <label className="checkbox-container-roles">
              <input type="checkbox-roles" />
              <span className="checkmark-roles"></span>
            </label>
            <p className="title-top-section-text">Name</p>
          </div>
          <div className="table-header-right-roles">
            <p className="title-top-section-text">ID</p>
            <p className="title-top-section-text">Modified</p>
            <p className="title-top-section-text shared-section-container">
              Shared
            </p>
          </div>
          <div className="settings-container-roles"></div>
        </div>

        <RolesList
          roles={roles}
          toggleSettings={toggleSettings}
          openSettingsIds={openSettingsIds}
          onOpenDeletePopup={handleOpenDeletePopup}
        />
      </div>
      <RolesPagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalRoles || 0}
        paginate={setCurrentPage}
        setItemsPerPage={setItemsPerPage} // Passing the setter function
      />

      {isDeletePopupOpen && (
        <DeleteRole
          key={selectedRole.id} // Change key to force re-render
          roleId={selectedRole.id as string}
          roleName={selectedRole.name}
          onClose={handleCloseDeletePopup}
          onDelete={handleDeleteRole}
        />
      )}
    </div>
  );
};

export default Roles;
