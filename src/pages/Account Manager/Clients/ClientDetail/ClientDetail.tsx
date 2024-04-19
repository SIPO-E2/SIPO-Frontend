// ClientDetail.tsx
import { useEffect, useState } from "react";
import { NavLink, Link, useParams, Outlet } from "react-router-dom";
import clientes from "../Data/data";
import "./NavViewClient.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { text } from "@fortawesome/fontawesome-svg-core";

interface Client {
  id: number;
  imageURL: string;
  name: string;
  joiningDate: string;
  numberOfProjects: number;
  experience: string;
  money: string;
  highGrowthClient: boolean;
  division: string[]; // Division is an array of strings
  contractFile?: File | null;
  additionalDetails?: string;
}

const ClientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [currentClient, setCurrentClient] = useState<Client | null>(null);

  useEffect(() => {
    if (id) {
      const client = clientes.find(
        (cliente) => cliente.id === parseInt(id, 10)
      );

      if (client) {
        // Ensuring division is always an array
        setCurrentClient({
          ...client,
          division: Array.isArray(client.division)
            ? client.division
            : [client.division],
        });
      } else {
        setCurrentClient(null); // Client not found
      }
    } else {
      console.error("No client ID provided in the URL");
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
          {currentClient?.numberOfProjects && (
            <span className="badge-view-client">
              {currentClient?.numberOfProjects}
            </span>
          )}
        </NavLink>
      </nav>
      <Outlet context={[currentClient]} />
    </section>
  );
};

export default ClientDetail;
