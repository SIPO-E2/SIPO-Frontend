import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef, FormEvent, ChangeEvent } from "react";
import "./Styles/EditClient.css";
import { useApisStore } from "../../../store/apiStore";

enum Division {
  Mexico = "Mexico",
  Brazil = "Brazil",
  CSA = "Central & South America",
  US = "United States",
}
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
    const clientId = parseInt(id ?? "");
    if (!clientId) {
      console.error("Invalid client ID");
      return; // Early return if the ID is not valid
    }

    // Function to load client data
    const loadClient = async () => {
      try {
        // Check if client is already in the state to avoid unnecessary API call
        const existingClient = clients.find((client) => client.id === clientId);
        if (existingClient) {
          setClient(existingClient);
        } else {
          // Only fetch if the client isn't already loaded
          await fetchClientById(clientId);
          // Assume fetchClientById updates the Zustand store, listen for changes in the store
        }
      } catch (error) {
        console.error("Failed to fetch client:", error);
      }
    };

    loadClient();
  }, [id]); // Depend only on `id` to prevent infinite loops

  // Listening to clients updates from the store
  useEffect(() => {
    const foundClient = clients.find(
      (client) => client.id === parseInt(id ?? "")
    );
    if (foundClient) {
      setClient(foundClient);
    }
  }, [clients, id ?? ""]); // This depends on clients and id, but only updates the local state

  if (!client) {
    return <div>Loading client information...</div>;
  }

  /* ----------------- Updating the Client --------------------- */

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (target.type === "checkbox") {
      // Safely assert 'target' as 'HTMLInputElement'
      const checked = (target as HTMLInputElement).checked;
      setClient((prev) =>
        prev
          ? {
              ...prev,
              [name]: checked,
              divisions:
                name === "divisions"
                  ? checked
                    ? [...prev.divisions, value as Division]
                    : prev.divisions.filter((div) => div !== value)
                  : prev.divisions,
            }
          : undefined
      );
    } else if (target.type === "file") {
      // Safely assert 'target' as 'HTMLInputElement' and check for files
      const files = (target as HTMLInputElement).files;
      setClient((prev) =>
        prev
          ? {
              ...prev,
              [name]: files ? files[0] : null,
            }
          : undefined
      );
    } else {
      // Handle other inputs like 'text', 'select', and 'textarea'
      setClient((prev) =>
        prev
          ? {
              ...prev,
              [name]: value,
            }
          : undefined
      );
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!client || !client.name || client.owner_user_id <= 0) {
      alert("Please ensure all required fields are filled out.");
      return;
    }

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
          Divisions:
          {Object.values(Division).map((div) => (
            <div key={div}>
              <input
                type="checkbox"
                name="divisions"
                value={div}
                checked={client.divisions.includes(div as Division)}
                onChange={handleChange}
              />
              {div}
            </div>
          ))}
        </label>

        <label>
          High Growth:
          <input
            type="checkbox"
            name="high_growth"
            checked={client?.high_growth || false}
            onChange={handleChange}
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
