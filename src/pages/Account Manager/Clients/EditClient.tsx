import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react"; // Importa useState
import "./Styles/EditClient.css";
import { useApisStore } from "../../../store/apiStore";
import { Client, Division } from "../../../types";

const EditClient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchClientById, updateClient, clients } = useApisStore((state) => ({
    fetchClientById: state.fetchClientById,
    updateClient: state.updateClient,
    clients: state.clients,
  }));

  const [clientData, setClientData] = useState<Client | null>(null);

  useEffect(() => {
    const currentId = parseInt(id ?? "0");
    const existingClient = clients.find((client) => client.id === currentId);
    if (!existingClient && id) {
      fetchClientById(currentId).then((client) => {
        if (client != null) {
          // Add null check here
          setClientData(client);
        }
      });
    } else {
      setClientData(existingClient || null);
    }
  }, [id, clients, fetchClientById]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : false;
    setClientData((prev) => ({
      ...prev!,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  setClientData((prev) => ({
    ...prev!,
    [name]: type === "checkbox" ? checked : value,
  }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (clientData) {
      try {
        await updateClient({
          ...clientData,
          joiningDate: new Date(clientData.joiningDate), // Make sure joiningDate is a Date object
        });
        alert("Client updated successfully!");
        navigate("/accountManager/clients");
      } catch (error) {
        console.error("Failed to update client:", error);
        alert("Failed to update client.");
      }
    }
  };

  if (!clientData) {
    return <div>Loading client information...</div>;
  }

  return (
    <div className="main-content">
      <h1>Edit Client: {clientData.name}</h1>
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
          Division:
          <select
            name="division"
            value={clientData.division}
            onChange={handleChange}
          >
            {Object.values(Division).map((division) => (
              <option key={division} value={division}>
                {division}
              </option>
            ))}
          </select>
        </label>
        <label>
          High Growth:
          <input
            type="checkbox"
            name="high_growth"
            checked={clientData.high_growth}
            onChange={handleChange}
          />
        </label>
        <label>
          Joining Date:
          <input
            type="date"
            name="joiningDate"
            value={new Date(clientData.joiningDate).toISOString().slice(0, 10)} // Ensure this is always a date
            onChange={handleChange}
          />
        </label>
        <label>
          Experience:
          <input
            type="text"
            name="experience"
            value={clientData.experience}
            onChange={handleChange}
          />
        </label>
        <label>
          Money:
          <input
            type="text"
            name="money"
            value={clientData.money}
            onChange={handleChange}
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="imageURL"
            value={clientData.imageURL}
            onChange={handleChange}
          />
        </label>
        <label>
          Additional Details:
          <textarea
            name="additionalDetails"
            value={clientData.additionalDetails}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditClient;
