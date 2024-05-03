// Ejemplo de un componente que lista los roles
import { useEffect, useState } from "react";
import { useApisStore } from "../../../store/apiStore";
import { Link } from "react-router-dom";
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
import EditRolePopUp from "../../../components/EditRolePopUp";
import CreateRolePopUp from "../../../components/CreateRolePopUp";
import RoleSlideOver from "../../../components/RoleSlideOver";
import DeletePopUp from "../../../components/DeletePopUp";
/* --------------------- IMPORTING DATE LIBRARY --------------------- */
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // Estilos principales
import "react-date-range/dist/theme/default.css"; // Tema por defecto
import { format } from "date-fns";
/* --------------------- IMPORTING INTERFACES--------------------- */
import { Role } from "../../../types";
/* --------------------- IMPORTING NOTIFICATION LIBRARY --------------------- */
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface DateRange {
  startDate?: Date; // La fecha de inicio puede ser Date o undefined
  endDate?: Date; // La fecha de finalización puede ser Date o undefined
  key: string;
}

const Roles = () => {
  const { roles, fetchRoles, updateRole, deleteRole, setRoles, totalRoles } =
    useApisStore((state) => ({
      roles: state.roles,
      fetchRoles: state.fetchRoles,
      updateRole: state.updateRole,
      deleteRole: state.deleteRole,
      setRoles: state.setRoles,
      totalRoles: state.totalRoles,
    }));

  useEffect(() => {
    fetchRoles(); // Fetch roles when component mounts
  }, []);

  const [selectedRole, setSelectedRole] = useState<Role>({
    id: "",
    name: "",
    users: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
    activeDB: false,
  });

  /* ------------------- NOTIFICATIONS FUNCTIONS --------------------- */

  const navigate = useNavigate();

  /* ------------------- DATE FILTER --------------------- */

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

  /* --------------------- SETTINGS POP UP --------------------- */

  const [openSettingsIds, setOpenSettingsIds] = useState(new Set<string>());

  const toggleSettings = (id: string) => {
    setOpenSettingsIds(
      (prev) =>
        new Set(
          prev.has(id) ? [...prev].filter((item) => item !== id) : [...prev, id]
        )
    );
  };

  /* --------------EDIT ROLE POPUP----------------- */

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = (role: Role) => {
    setSelectedRole(role);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedRole({
      id: "",
      name: "",
      users: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
      activeDB: false,
    }); // Reset selected role
  };

  const handleEditSubmit = (roleData: { id: string; name: string }) => {
    updateRole(roleData)
      .then(() => {
        closeEditModal();
      })
      .catch((error) => {
        console.error("Failed to update role", error);
      });
  };

  /* --------------CREATE ROLE POPUP----------------- */

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateSubmit = (roleData: { name: string }) => {
    toast.success(`Role ${roleData.name} successfully created!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  /* ------------------- DELETE ROLE ------------------- */

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = (role: Role) => {
    setSelectedRole(role);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);

    setSelectedRole({
      id: "",
      name: "",
      users: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
      activeDB: false,
    }); // Reset selected role
  };

  const handleDeleteRole = (id: string, name: string) => {
    deleteRole(id)
      .then(() => {
        closeDeleteModal();
        toast.success(`Role ${name} successfully deleted!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        alert("Failed to delete client. Please try again.");
        toast.error(`Failed to delete ${name}. Please try again.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  /* ------------------- SLIDE OVER ------------------- */

  const [isUsersSlideOverOpen, setIsUsersSlideOverOpen] = useState(false);

  const openUsersSlideOver = (role: Role) => {
    setSelectedRole(role);
    setIsUsersSlideOverOpen(true);
  };

  return (
    <div className="main-roles">
      <div className="body-content-roles">
        <div className="roles-top-section ">
          <h4 className="section-title-roles">Roles</h4>

          <button className="add-button-roles" onClick={openCreateModal}>
            + Add
          </button>
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
          onEdit={openEditModal}
          onDelete={openDeleteModal}
          onShowUsers={openUsersSlideOver}
          onToggleSettings={toggleSettings}
          openSettingsIds={openSettingsIds}
        />
      </div>
      <RolesPagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalRoles || 0}
        paginate={setCurrentPage}
        setItemsPerPage={setItemsPerPage} // Passing the setter function
      />

      <EditRolePopUp
        role={selectedRole}
        isOpen={isEditModalOpen}
        onSubmit={handleEditSubmit}
        onClose={closeEditModal}
      />
      <CreateRolePopUp
        isOpen={isCreateModalOpen}
        onSubmit={handleCreateSubmit}
        onClose={closeCreateModal}
      />
      <RoleSlideOver
        role={selectedRole}
        isOpen={isUsersSlideOverOpen}
        onClose={() => setIsUsersSlideOverOpen(false)}
      />
      <DeletePopUp
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={() => handleDeleteRole(selectedRole.id, selectedRole.name)}
        name={selectedRole.name}
      />
    </div>
  );
};

export default Roles;
