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

  const { roles, fetchRoles } = useApisStore((state) => ({
    roles: state.roles,
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

  /* --------------------- FETCHING ROLES --------------------- */

  useEffect(() => {
    fetchRoles(1, 10, searchName);
  }, [fetchRoles, searchName]);

  /* --------------------- MODAL --------------------- */

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  /* --------------------- DATE RANGE --------------------- */

  const applyDateSelection = () => {
    if (selectedRange.startDate && selectedRange.endDate) {
      const formattedStart = format(selectedRange.startDate, "yyyy-MM-dd");
      const formattedEnd = format(selectedRange.endDate, "yyyy-MM-dd");
      fetchRoles(1, 10, searchName, formattedStart, formattedEnd);
      const newDateRangeText = `${format(
        selectedRange.startDate,
        "MMM dd, yyyy"
      )} - ${format(selectedRange.endDate, "MMM dd, yyyy")}`;
      setDateRangeText(newDateRangeText);
      toggleModal();
    }
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
            <p>Select Date</p>
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
                  onChange={(item: RangeKeyDict) => {
                    const {
                      startDate,
                      endDate,
                      key = "selection",
                    } = item.selection; // Default key if undefined
                    if (startDate && endDate) {
                      const newRange: DateRange = { startDate, endDate, key };
                      setState([newRange]); // Ensuring the array is updated correctly
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
        <ul>
          <RolesList roles={roles} />
        </ul>
      </div>
    </div>
  );
};

export default RoleUserList;
