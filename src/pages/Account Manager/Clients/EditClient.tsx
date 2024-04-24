import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./Styles/EditClient.css";
import { useApisStore } from "../../../store/apiStore";

const EditClient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchClientById, clients } = useApisStore((state) => ({
    fetchClientById: state.fetchClientById,
    clients: state.clients,
  }));

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
          if (fetchedClient) {
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

  return (
    <div className="main-content">
      <h1>Edit Client: {client.name}</h1>
      <ul>
        <li>ID: {client.id}</li>
        <li>Name: {client.name}</li>
        <li>Division: {client.division}</li>
        <li>High Growth: {client.high_growth ? "Yes" : "No"}</li>
        <li>
          Joining Date:{" "}
          {new Date(client.joiningDate).toISOString().slice(0, 10)}
        </li>
        <li>Experience: {client.experience}</li>
        <li>Money: {client.money}</li>
        <li>
          Image URL: <img src={client.imageURL} alt="Client" />
        </li>
        <li>Additional Details: {client.additionalDetails}</li>
      </ul>
      <Link to="/accountManager/clients">
        <button className="btn btn-secondary">Back to Clients</button>
      </Link>
    </div>
  );
};

export default EditClient;
