import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./Styles/EditClient.css";
import { useApisStore } from "../../../store/apiStore";

const EditClient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchClientById, updateClient, clients, users, fetchUsers } =
    useApisStore((state) => ({
      fetchClientById: state.fetchClientById,
      updateClient: state.updateClient,
      clients: state.clients,
      users: state.users,
      fetchUsers: state.fetchUsers,
    }));

  /* ----------------- Updating the Owner_user:id --------------------- */
  useEffect(() => {
    fetchUsers(); // This will fetch all users if not already fetched
  }, [fetchUsers]);

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

  /* ----------------- Updating the Client --------------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateClient(client);
      alert("Client updated successfully!");
    } catch (error) {
      console.error("Error updating client:", error);
      alert("Failed to update client.");
    }
  };

  if (!client) {
    return <div>Loading client information...</div>;
  }

  return (
    <div className="main-content">
      <h1>Edit Client: {client.name}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={client.name || ""}
            onChange={handleChange}
            placeholder="Client Name"
          />
        </label>
        <label>
          Owner User ID:
          <select
            name="owner_user_id"
            value={client.owner_user_id}
            onChange={handleChange}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} (ID: {user.id})
              </option>
            ))}
          </select>
        </label>
        <label>
          Division:
          <input
            type="text"
            name="division"
            value={client.division || ""}
            onChange={handleChange}
            placeholder="Division"
          />
        </label>
        <label>
          High Growth:
          <select
            name="high_growth"
            value={String(client.high_growth)}
            onChange={handleChange}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>
        <label>
          Joining Date:
          <input
            type="date"
            name="joiningDate"
            value={
              client.joiningDate
                ? new Date(client.joiningDate).toISOString().slice(0, 10)
                : ""
            }
            onChange={handleChange}
          />
        </label>
        <label>
          Experience:
          <input
            type="text"
            name="experience"
            value={client.experience || ""}
            onChange={handleChange}
            placeholder="Experience"
          />
        </label>
        <label>
          Money:
          <input
            type="number"
            name="money"
            value={client.money || ""}
            onChange={handleChange}
            placeholder="Money"
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="imageURL"
            value={client.imageURL || ""}
            onChange={handleChange}
            placeholder="Image URL"
          />
        </label>
        <label>
          Additional Details:
          <textarea
            name="additionalDetails"
            value={client.additionalDetails || ""}
            onChange={handleChange}
            placeholder="Additional Details"
          ></textarea>
        </label>
        <button type="submit">Save Changes</button>
      </form>
      <Link to="/accountManager/clients">
        <button className="btn btn-secondary">Back to Clients</button>
      </Link>
    </div>
  );
};

export default EditClient;
