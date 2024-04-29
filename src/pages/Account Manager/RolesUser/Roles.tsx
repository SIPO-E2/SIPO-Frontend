// Ejemplo de un componente que lista los roles
import React, { useEffect, useState } from "react";
import { useApisStore } from "../../../store/apiStore";
import "./Styles/Roles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import RolesList from "./RolesList";
import RolesPagination from "../../../components/RolesPagination";
/* --------------------- IMPORTING DATE LIBRARY --------------------- */
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // Estilos principales
import "react-date-range/dist/theme/default.css"; // Tema por defecto
import { format } from "date-fns";
import { da } from "date-fns/locale";

interface DateRange {
  startDate?: Date; // La fecha de inicio puede ser Date o undefined
  endDate?: Date; // La fecha de finalización puede ser Date o undefined
  key: string;
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

const RoleUserList = () => {
  /* --------------------- STATES --------------------- */

  const { roles, totalRoles, fetchRoles } = useApisStore((state) => ({
    roles: state.roles,
    totalRoles: state.totalRoles,
    fetchRoles: state.fetchRoles,
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, setState] = useState<DateRange[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [dateRangeText, setDateRangeText] = useState(
    `${format(new Date(), "MMM dd, yyyy")} - ${format(
      addDays(new Date(), 7),
      "MMM dd, yyyy"
    )}`
  );
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    key: "selection",
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
      formattedEnd
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

  /* --------------------- REMOVE DATE FILTER --------------------- */

  const removeDateFilter = () => {
    setSelectedRange({ key: "selection" }); // Reset the selected range
    setState([{ startDate: undefined, endDate: undefined, key: "selection" }]);
    setDateRangeText("Select Date");
    setFormattedStart("");
    setFormattedEnd("");
    fetchRoles(currentPage, itemsPerPage, searchName, "", ""); // Refetch without dates
  };

  return (
    <div className="main-roles">
      <div className="body-content-roles">
        <h4 className="roles-section-title">Roles </h4>
        <div className="roles-top-section">
          <div className="roles-search-section">
            <FontAwesomeIcon icon={faSearch} className="roles-search-icon" />
            <input
              className="roles-search-input"
              type="text"
              placeholder="Search by name..."
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

                <div>
                  <button onClick={toggleModal}>Cancel</button>
                  <button onClick={applyDateSelection}>Apply</button>
                </div>
              </div>
            </div>
          )}
        </div>
        {dateRangeText !== "Select Date" && (
          <div>
            <p>{totalRoles} results found</p>
            <p>
              Date: {dateRangeText}
              <span onClick={removeDateFilter} style={{ cursor: "pointer" }}>
                X
              </span>
            </p>
          </div>
        )}

        <ul>
          <RolesList roles={roles} />
        </ul>
      </div>
      <RolesPagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalRoles || 0}
        paginate={setCurrentPage}
        setItemsPerPage={setItemsPerPage} // Passing the setter function
      />
    </div>
  );
};

export default RoleUserList;
