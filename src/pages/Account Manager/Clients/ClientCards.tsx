import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faEye,
  faPen,
  faTrash,
  faBriefcase,
  faChartSimple,
  faEarthAmericas,
  faMoneyBill,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import clientes from "./Data/data";
import "./Styles/Clients.css";
import "./Styles/Cards.css";
import projects from "./Data/projectsData";

interface ClientCardProps {
  toggleSettings: (id: number) => void;
  openSettingsIds: Set<number>;
  onOpenDeletePopup: (id: number) => void;
}

const ClientCards: React.FC<ClientCardProps> = ({
  toggleSettings,
  openSettingsIds,
  onOpenDeletePopup, // Make sure this prop is passed to ClientCards in Clients component
}) => {
  return clientes.map((client) => {
    // Contar los proyectos para este cliente
    const clientProjectsCount = projects.filter(
      (project) => project.clientId === client.id
    ).length;

    const handleDeleteClick = () => {
      onOpenDeletePopup(client.id);
    };

    return (
      <div className="col-lg-4 col-md-12 col-sm-12 mb-4" key={client.id}>
        <div className="job-card">
          <div className="card-top">
            <img
              src={client.imageURL}
              alt="Company Logo"
              className="company-logo"
            />
            <div className="settings" onClick={() => toggleSettings(client.id)}>
              <FontAwesomeIcon icon={faEllipsisVertical} />
              {openSettingsIds.has(client.id) && (
                <div className="floating-dropdown show cursor-pointer">
                  <ul>
                    <li className="drop-down-text">
                      <Link to={`/accountManager/clients/view/${client.id}`}>
                        <FontAwesomeIcon
                          icon={faEye}
                          className="drop-down-icon"
                        />
                        View
                      </Link>
                    </li>
                    <li className="drop-down-text">
                      <Link to={`/accountManager/clients/${client.id}`}>
                        <FontAwesomeIcon
                          icon={faPen}
                          className="drop-down-icon"
                        />
                        Edit
                      </Link>
                    </li>
                    <li className="drop-down-text red">
                      <button
                        onClick={() => onOpenDeletePopup(client.id)}
                        className="drop-down-text red"
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="drop-down-icon"
                        />
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="top-card-section">
            <h4 className="title-card">{client.name}</h4>
            <p className="subtitle-card">Joining date: {client.joiningDate}</p>
            <p className="subtitle-card blue spacing-bottom">
              <FontAwesomeIcon icon={faBriefcase} className="job-icons blue" />
              {clientProjectsCount} Projects
            </p>
          </div>
          <hr className="custom-hr-card" />
          <div className="detail-section">
            <div className="detail-row">
              <p className="subtitle-card">
                <FontAwesomeIcon icon={faChartSimple} className="job-icons" />
                &gt; {client.experience}
              </p>
              <p className="subtitle-card">
                <FontAwesomeIcon icon={faEarthAmericas} className="job-icons" />
                {Array.isArray(client.division)
                  ? client.division.join(", ")
                  : ""}
              </p>
            </div>
            <div className="detail-row">
              <p className="subtitle-card">
                <FontAwesomeIcon icon={faMoneyBill} className="job-icons" />
                {client.money}
              </p>
              <p className="subtitle-card">
                <FontAwesomeIcon icon={faUser} className="job-icons" />
                {client.highGrowthClient ? "High-Growth" : "Regular"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export default ClientCards;
