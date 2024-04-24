import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
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

interface Project {
  id: number;
  owner_user_id: number;
  owner_user: User;
  owner_client_id: number;
  owner_client: Client;
  name: string;
  status: Status;
  reason_current_status: string;
  status_date: Date;
  progress: number;
  revenue: number;
  region: Region;
  posting_date: Date;
  exp_closure_date: Date;
  image: string;
  job_positions_list: JobPosition[];
  activeDB: boolean;
}

// Asumiendo que User y Project también se han importado o definido en otro lugar
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  clients: Client[];
  projects: Project[];
  roles: Role[];
  activeDB: boolean;
}

enum Division {
  IT = "IT",
  HR = "HR",
  Finance = "Finance",
  Sales = "Sales",
}

interface ClientFormData {
  name: string;
  division: string;
  high_growth: boolean;
  additionalDetails: string;
  joiningDate: string;
  experience: string;
  money: string;
  owner_user_id: number;
  imageURL: string;
  contractFile: File | null;
}

const AddClient: React.FC = () => {
  const [clientData, setClientData] = useState<ClientFormData>({
    name: "",
    division: "IT",
    high_growth: false,
    additionalDetails: "",
    joiningDate: "",
    experience: "",
    money: "",
    owner_user_id: 1, // Inicialización con un ejemplo
    imageURL: "",
    contractFile: null,
  });

  const { createClient, users, fetchUsers } = useApisStore();

  useEffect(() => {
    fetchUsers().catch(console.error);
  }, [fetchUsers]);

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

    // Utilizar los datos del estado clientData en lugar de datos estáticos
    if (!clientData.name || clientData.owner_user_id <= 0) {
      alert("Please ensure all required fields are filled out.");
      return;
    }

    try {
      const newClient = await createClient({
        name: clientData.name,
        owner_user_id: clientData.owner_user_id,
        division: clientData.division,
        high_growth: clientData.high_growth,
        imageURL: clientData.imageURL,
        contractFile: clientData.contractFile
          ? clientData.contractFile.name
          : "", // Asegúrate de manejar archivos correctamente
        joiningDate: clientData.joiningDate,
        experience: clientData.experience,
        money: clientData.money,
        additionalDetails: clientData.additionalDetails,
      });
      console.log("Client created:", newClient);
      alert("Client added successfully!");
      // Opcional: Restablecer el formulario
    } catch (error) {
      console.error("Failed to create client:", error);
      alert(
        "Failed to add client: " + (error.message || JSON.stringify(error))
      );
    }
  };

  return (
    <div>
      <h1>Add New Client</h1>
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
            name="highGrowth"
            checked={clientData.high_growth}
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
        <label>
          Joining Date:
          <input
            type="date"
            name="joiningDate"
            value={clientData.joiningDate}
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
            type="number"
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
          Contract File:
          <input type="file" name="contractFile" onChange={handleChange} />
        </label>
        <label>
          Owner User ID:
          <input
            type="number"
            name="owner_user_id"
            value={clientData.owner_user_id}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Create Client</button>
      </form>

      <div>
        <h2>Users and their Clients</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>User ID:</strong> {user.id}, <strong>Name:</strong>{" "}
              {user.name}
              <ul>
                {user.clients.map((client) => (
                  <li key={client.id}>
                    {client.name} (Client ID: {client.id})
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddClient;
