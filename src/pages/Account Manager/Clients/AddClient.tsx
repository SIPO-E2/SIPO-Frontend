import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useApisStore } from "../../../store/apiStore";

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
  profileImage: string;
  clients: Client[];
  projects: Project[];
  roles: Role[];
  activeDB: boolean;
}

enum Division {
  Mexico = "Mexico",
  Brazil = "Brazil",
  CSA = "Central & South America",
  US = "United States",
}

interface ClientFormData {
  name: string;
  divisions: string[]; // Cambio en la estructura de datos para las divisiones
  high_growth: boolean;
  additionalDetails: string;
  joiningDate: string;
  experience: string;
  salary: string;
  owner_user_id: number;
  imageURL: string;
  contractFile: File | null;
}

const AddClient: React.FC = () => {
  const [clientData, setClientData] = useState<ClientFormData>({
    name: "",
    divisions: [],
    high_growth: false,
    additionalDetails: "",
    joiningDate: "",
    experience: "",
    salary: "",
    owner_user_id: 1, // Mejor inicializar con un valor nulo o gestionar esta asignación de forma dinámica
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

    // Manejo específico para el checkbox "High Growth"
    if (name === "high_growth" && type === "checkbox") {
      setClientData((prev) => ({
        ...prev,
        high_growth: checked,
      }));
    } else if (type === "checkbox") {
      // Manejo para otros checkboxes, por ejemplo, para "divisions"
      const updatedDivisions = checked
        ? [...clientData.divisions, value]
        : clientData.divisions.filter((div) => div !== value);
      setClientData((prev) => ({
        ...prev,
        divisions: updatedDivisions,
      }));
    } else if (type === "file") {
      // Manejo para inputs de tipo archivo
      setClientData((prev) => ({
        ...prev,
        [name]: files ? files[0] : null,
      }));
    } else {
      // Manejo estándar para otros inputs
      setClientData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!clientData.name || clientData.owner_user_id <= 0) {
      alert("Please ensure all required fields are filled out.");
      return;
    }

    try {
      const newClient = await createClient({
        name: clientData.name,
        owner_user_id: clientData.owner_user_id,
        divisions: clientData.divisions, // Cambio en la estructura de datos
        high_growth: clientData.high_growth,
        imageURL: clientData.imageURL,
        contractFile: clientData.contractFile
          ? clientData.contractFile.name
          : "",
        joiningDate: clientData.joiningDate,
        experience: clientData.experience,
        salary: clientData.salary,
        additionalDetails: clientData.additionalDetails,
      });
      console.log("Client created:", newClient);
      alert("Client added successfully!");
      // Opcional: Restablecer el formulario
    } catch (error) {
      console.error("Failed to create client:", error);
      alert("Failed to add client: " + (error || JSON.stringify(error)));
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
          Divisions:
          {Object.values(Division).map((div) => (
            <div key={div}>
              <input
                type="checkbox"
                name="divisions"
                value={div}
                checked={clientData.divisions.includes(div as Division)}
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
          Salary:
          <input
            type="number"
            name="salary"
            value={clientData.salary}
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
          Owner User:
          <select
            name="owner_user_id"
            value={clientData.owner_user_id}
            onChange={handleChange}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
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
