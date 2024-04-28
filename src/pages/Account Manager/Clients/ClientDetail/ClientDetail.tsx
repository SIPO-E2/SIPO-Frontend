// ClientDetail.tsx
import { useEffect, useState, useRef } from "react";
import { NavLink, Link, useParams, Outlet } from "react-router-dom";
import "./NavViewClient.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { useApisStore } from "../../../../store";

const ClientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchClientById, clients } = useApisStore((state) => ({
    fetchClientById: state.fetchClientById,
    clients: state.clients,
  }));

  /* ----------------- Fetching the client --------------------- */
  const clientRef = useRef(
    clients.find((client) => client.id === parseInt(id || "0"))
  );
  const [client, setClient] = useState(clientRef.current);

  useEffect(() => {
    const clientId = parseInt(id || "0");
    const existingClient = clients.find((client) => client.id === clientId);

    if (!existingClient && id) {
      fetchClientById(clientId)
        .then((fetchedClient) => {
          if (fetchedClient !== undefined) {
            setClient(fetchedClient);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch client:", error);
        });
    } else {
      setClient(existingClient);
    }
  }, [id, clients, fetchClientById]);

  if (!client) {
    return <div>Loading client information...</div>;
  }

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
          <span className="badge-view-client">{`${client.projects.length}`}</span>
        </NavLink>
      </nav>
      <Outlet context={[client]} />
    </section>
  );
};

export default ClientDetail;
