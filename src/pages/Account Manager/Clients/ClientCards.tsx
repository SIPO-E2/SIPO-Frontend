import React, { useEffect, useState } from "react";
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
import { getClients } from "../../../api/clientAPI";

enum Region {
  Mexico = "Mexico",
  Brazil = "Brazil",
  USA = "USA",
}

enum Status {
  Open = "Open",
  OnGoing = "On Going",
  Closed = "Closed",
}

interface Role {
  id: string;
  name: string;
  users: User[];
  // createdAt: Date;
  // updatedAt: Date;
  // deletedAt: Date;
  activeDB: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  clients: Client[];
  projects: Project[];
  roles: Role[];
  activeDB: boolean;
}
interface Project {
  id: number;
  owner_user_id: number;
  owner_user: User;
  owner_client_id: number;
  owner_client: Client;
  name: string;
  status: Status;
  reason_current_status: string;
  status_date: Date;
  progress: number;
  revenue: number;
  region: Region;
  posting_date: Date;
  exp_closure_date: Date;
  image: string;
  // job_positions_list: JobPosition[];
  activeDB: boolean;
}

enum Division {
  IT = "IT",
  HR = "HR",
  Finance = "Finance",
  Sales = "Sales",
}

interface Client {
  id: number;
  owner_user_id: number;
  owner_user: User;
  name: string; // ya
  division: Division; // ya
  high_growth: boolean; // ya
  projects: Project[];
  // employees: Employee[];
  activeDB: boolean;
  // new chaneges
  joiningDate: Date; // ya
  experience: string; // ya
  money: string; // ya
  imageURL: string; // image -> imageURL ya
  contractFile?: File | null; // ya
  additionalDetails: string; // details -> additionalDetails  ya
}

interface ClientCardProps {
  toggleSettings: (id: number) => void;
  openSettingsIds: Set<number>;
  onOpenDeletePopup: (id: number, name: string) => void;
}

const ClientCards: React.FC<ClientCardProps> = ({
  toggleSettings,
  openSettingsIds,
  onOpenDeletePopup,
}) => {
  // Implementing the useEffect hook to fetch clients
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const fetchedClients = await getClients();
        console.log("Fetched clients:", fetchedClients); // Log the fetched data to inspect its structure
        setClients(fetchedClients); // Fetch clients and store directly without modifying their types
        setError(null);
      } catch (err) {
        console.error("Fetching clients failed:", err); // Log errors if the fetching fails
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) return <p>Loading clients...</p>;
  if (error) return <p>Error fetching clients: {error}</p>;

  return clients.length > 0 ? (
    clients.map((client) => (
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
              Joining date: {new Date(client.joiningDate).toLocaleDateString()}
            </p>
            <p className="subtitle-card blue spacing-bottom">
              <FontAwesomeIcon icon={faBriefcase} className="job-icons blue" />
              {client.projects.length} Projects
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
                <FontAwesomeIcon icon={faEarthAmericas} className="job-icons" />
                {client.division}
              </p>
            </div>
            <div className="detail-row">
              <p className="subtitle-card">
                <FontAwesomeIcon icon={faMoneyBill} className="job-icons" />
                {client.money}
              </p>
              <p className="subtitle-card">
                <FontAwesomeIcon icon={faUser} className="job-icons" />
                {client.high_growth ? "High-Growth" : "Regular"}
              </p>
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p>No clients found</p>
  );
};

export default ClientCards;
