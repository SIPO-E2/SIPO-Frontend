import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./Styles/EditClient.css";
import { useApisStore } from "../../../store/apiStore";

enum Division {
  IT = "IT",
  HR = "HR",
  Finance = "Finance",
  Sales = "Sales",
}

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
          <select
            name="division"
            value={client.division}
            onChange={handleChange}
          >
            <option value="">Select a Division</option>
            {Object.values(Division).map((div) => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </select>
        </label>
        <label>
          High Growth:
          <input
            type="checkbox"
            name="high_growth"
            checked={client.high_growth}
            onChange={(e) =>
              setClient({ ...client, high_growth: e.target.checked })
            }
          />
        </label>
        <label>
          Contract File:
          <input
            type="file"
            name="contractFile"
            onChange={handleChange}
            placeholder="Contract File"
          />
          <div>
            {client.contractFile
              ? `Current file: ${client.contractFile}`
              : "No file uploaded"}
          </div>
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
          Salary:
          <input
            type="number"
            name="salary"
            value={client.salary || ""}
            onChange={handleChange}
            placeholder="Salary"
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
