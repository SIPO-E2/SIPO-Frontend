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

const ClientCards = ({ clients }: { clients: Client[] }) => {
  return (
    <div className="row">
      {clients.map((client) => (
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={client.id}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{client.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {client.division}
              </h6>
              <p className="card-text">{client.experience}</p>
              <Link to={`/clients/${client.id}`} className="card-link">
                Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientCards;
