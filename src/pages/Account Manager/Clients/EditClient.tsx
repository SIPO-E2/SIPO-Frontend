import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./Styles/EditClient.css";
import { useApisStore } from "../../../store/apiStore";

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
  money: number;
  imageURL: string;
  contractFile?: File | null;
  additionalDetails: string;
}

const EditClient = ({ clientId }) => {
  const [clientData, setClientData] = useState({
    id: clientId,
    name: "",
    division: "",
    high_growth: false,
    additionalDetails: "",
    joiningDate: "",
    experience: "",
    money: "",
    owner_user_id: 1,
    imageURL: "",
    contractFile: null,
  });

  const { updateClient, fetchClientById, users, fetchUsers } = useApisStore();

  useEffect(() => {
    const loadClientData = async () => {
      try {
        const client = await fetchClientById(clientId);
        if (client) {
          setClientData({
            ...client,
            joiningDate: client.joiningDate.split("T")[0], // Formatea la fecha si es necesario
          });
        }
      } catch (error) {
        console.error("Error loading the client:", error);
      }
    };

    loadClientData();
    fetchUsers().catch(console.error);
  }, [clientId, fetchClientById, fetchUsers]);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, checked, files } = event.target;
    switch (type) {
      case "checkbox":
        setClientData({ ...clientData, [name]: checked });
        break;
      case "file":
        setClientData({ ...clientData, [name]: files ? files[0] : null });
        break;
      default:
        setClientData({ ...clientData, [name]: value });
        break;
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateClient(clientData);
      alert("Client updated successfully!");
    } catch (error) {
      console.error("Failed to update client:", error);
      alert("Failed to update client: " + error.message);
    }
  };

  return (
    <div>
      <h1>Edit Client</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={clientData.name}
            onChange={handleChange}
          />
        </label>

        <label>
          Owner User ID:
          <select
            name="owner_user_id"
            value={clientData.owner_user_id}
            onChange={handleChange}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} (ID: {user.id})
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Update Client</button>
      </form>
    </div>
  );
};

export default EditClient;
