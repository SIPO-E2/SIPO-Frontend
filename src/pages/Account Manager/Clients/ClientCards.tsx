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
import "./Styles/Clients.css";
import "./Styles/Cards.css";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // This will format the date as "YYYY-MM-DD"
};

interface Client {
  id: number;
  owner_user_id: number;
  owner_user: User;
  name: string;
  divisions: Division[];
  high_growth: boolean;
  projects: Project[];
  activeDB: boolean;
  joiningDate: Date;
  experience: string;
  salary: number;
  imageURL: string;
  contractFile: File | null;
  additionalDetails: string;
}

interface ClientCardProps {
  clients: Client[];
  toggleSettings: (id: number) => void;
  openSettingsIds: Set<number>;
  onOpenDeletePopup: (clientId: number, clientName: string) => void;
}

const ClientCards: React.FC<ClientCardProps> = ({
  clients,
  toggleSettings,
  openSettingsIds,
  onOpenDeletePopup,
}) => {
  return (
    <div className="row">
      {clients.map((client) => (
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={client.id}>
          <div className="job-card">
            <div className="card-top">
              <img
                src={client.imageURL}
                alt="Company Logo"
                className="company-logo"
              />
              <div
                className="settings"
                onClick={() => toggleSettings(client.id)}
              >
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
                        <button>
                          <Link to={`/accountManager/clients/${client.id}`}>
                            <FontAwesomeIcon
                              icon={faPen}
                              className="drop-down-icon"
                            />
                            Edit
                          </Link>
                        </button>
                      </li>
                      <li className="drop-down-text red">
                        <button
                          className="delete-button-client-cards"
                          onClick={() =>
                            onOpenDeletePopup(client.id, client.name)
                          }
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
              <p className="subtitle-card">
                Joining date: {formatDate(client.joiningDate.toString())}
              </p>
              <p className="subtitle-card blue spacing-bottom">
                <FontAwesomeIcon
                  icon={faBriefcase}
                  className="job-icons blue"
                />
                {client.projects?.length || 0} Projects
              </p>
            </div>
            <hr className="custom-hr-card" />
            <div className="detail-section">
              <div className="detail-row">
                <p className="subtitle-card">
                  <FontAwesomeIcon icon={faChartSimple} className="job-icons" />
                  {client.experience}
                </p>
                <p className="subtitle-card">
                  <FontAwesomeIcon
                    icon={faEarthAmericas}
                    className="job-icons"
                  />
                  {client.divisions
                    .map((division: Division) => division)
                    .join(", ")}
                </p>
              </div>
              <div className="detail-row">
                <p className="subtitle-card">
                  <FontAwesomeIcon icon={faMoneyBill} className="job-icons" />$
                  {client.salary ? client.salary : 0}
                </p>
                <p className="subtitle-card">
                  <FontAwesomeIcon icon={faUser} className="job-icons" />
                  {client.high_growth ? "High Growth" : "Regular"}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientCards;
