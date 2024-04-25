// ClientDetail.tsx
import { useEffect, useState } from "react";
import { NavLink, Link, useParams, Outlet } from "react-router-dom";
import clientes from "../Data/data";
import "./NavViewClient.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import projects from "../Data/projectsData";

interface Client {
  id: number;
  owner_user_id: number;
  owner_user: User;
  name: string;
  division: Division;
  high_growth: boolean;
  projects: Project[];
  // employees: Employee[];
  activeDB: boolean;
  joiningDate: Date;
  experience: string;
  salary: number;
  imageURL: string;
  contractFile?: File | null;
  additionalDetails: string;
}
const ClientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    if (id) {
      const client = clientes.find(
        (cliente) => cliente.id === parseInt(id, 10)
      );

      if (client) {
        setCurrentClient(client);
        // Count projects related to the client
        const relatedProjects = projects.filter(
          (project) => project.clientId === client.id
        );
        setProjectCount(relatedProjects.length);
      } else {
        // Client not found
        setCurrentClient(null);
      }
    }
  }, [id]);

  const activeStyles = {
    color: "rgb(33, 43, 54)",
    borderBottom: "5px solid black",
    paddingBottom: "18px",
    textDecoration: "none",
    fontWeight: "bold",
  };

  return (
    <section className="main-content">
      <div className="back-container">
        <Link to="../clients" className="back-button">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="back-icon-view-client"
          />
          <span className="back-text">Back</span>
        </Link>
      </div>

      <nav className="nav-tabs-view-client">
        <NavLink
          to="."
          end
          style={({ isActive }) => (isActive ? activeStyles : undefined)}
        >
          Client Content
        </NavLink>

        <NavLink
          to="projects"
          style={({ isActive }) => (isActive ? activeStyles : undefined)}
        >
          Projects
          <span className="badge-view-client">{`${projectCount}`}</span>
        </NavLink>
      </nav>
      <Outlet context={[currentClient]} />
    </section>
  );
};

export default ClientDetail;
