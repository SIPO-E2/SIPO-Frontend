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

const RoleUserList = () => {
  /* --------------------- MODAL --------------------- */
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
            <p>Select Date</p>
            <div onClick={toggleModal}>
              <FontAwesomeIcon
                icon={isModalOpen ? faChevronUp : faChevronDown}
                className="display-icon"
              />
            </div>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="modal-roles">
              <div className="modal-content-roles">
                {/* Contenido del modal */}
                <button onClick={toggleModal}>Close</button>
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
