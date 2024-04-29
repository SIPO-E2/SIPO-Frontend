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

const RoleUserList = () => {
  /* --------------------- MODAL --------------------- */
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  /* --------------------- DATE RANGE --------------------- */

  // Estado para las fechas del rango
  const [state, setState] = useState<DateRange[]>([
    // Asegurando que el estado cumpla con el tipo DateRange
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

  // Estado para la fecha seleccionada que se mostrará en la interfaz de usuario
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    key: "selection",
  });

  const applyDateSelection = () => {
    // Actualizar el texto para mostrar en la interfaz de usuario
    if (selectedRange.startDate && selectedRange.endDate) {
      const newDateRangeText = `${format(
        selectedRange.startDate,
        "MMM dd, yyyy"
      )} - ${format(selectedRange.endDate, "MMM dd, yyyy")}`;
      setDateRangeText(newDateRangeText);
    }
    toggleModal(); // Cerrar el modal
  };
  /* --------------------- Fetch Roles --------------------- */

  const { roles, fetchRoles } = useApisStore();

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

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
              placeholder="Search ..."
            />
          </div>

          <div className="roles-top-filters">
            <p onClick={toggleModal}>{dateRangeText}</p>
            <p>Select Date</p>
            <div onClick={toggleModal}>
              <FontAwesomeIcon
                icon={isModalOpen ? faChevronUp : faChevronDown}
                className="display-icon"
              />
            </div>
          </div>

          {isModalOpen && (
            <div className="modal-roles">
              <div className="modal-content-roles">
                <DateRangePicker
                  onChange={(item: RangeKeyDict) => {
                    // Actualiza el estado que usa el componente DateRangePicker
                    const newRanges = [
                      {
                        ...item.selection,
                        key: "selection",
                      },
                    ];
                    setState(newRanges);
                    // También actualiza el rango seleccionado que se utilizará cuando se haga clic en Apply
                    setSelectedRange(newRanges[0]);
                  }}
                  // Removiendo las propiedades que no son reconocidas o soportadas
                  months={2}
                  ranges={state}
                  direction="horizontal"
                />
                {/* Botones */}
                <div>
                  <button onClick={toggleModal}>Cancel</button>
                  <button onClick={applyDateSelection}>Apply</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <ul>
          {roles.map((role) => (
            <li key={role.id}>
              <strong>{role.name}</strong>
              <ul>
                {role.users.map((user) => (
                  <li key={user.id}>{user.name}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RoleUserList;
