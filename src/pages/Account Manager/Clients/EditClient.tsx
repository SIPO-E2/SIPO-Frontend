import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react"; // Importa useState
import "./Styles/EditClient.css";
import { useApisStore } from "../../../store/apiStore";
import { getClientById } from "../../../api/clientAPI";

interface Client {
  id: number;
  owner_user_id: number;
  name: string;
  division: string[]; // Assuming division is a string array for simplicity
  high_growth: boolean;
  joiningDate: Date;
  experience: string;
  money: string;
  imageURL: string;
  additionalDetails: string;
}

const EditClient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchClientById } = useApisStore((state) => ({
    fetchClientById: state.fetchClientById,
  }));

  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    if (id) {
      fetchClientById(parseInt(id))
        .then((fetchedClient: Client) => {
          setClient(fetchedClient);
        })
        .catch((error) => {
          console.error("Failed to fetch client:", error);
          // Handle the error appropriately
        });
    }
  }, [id, fetchClientById]);

  if (!client) {
    return <div>Loading client data...</div>;
  }

  return (
    <div>
      <h1>Edit Client: {client.name}</h1>
      {/* Display or edit the client details here */}
    </div>
  );
};

export default EditClient;
