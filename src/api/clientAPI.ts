import axios from "axios";
import { act } from "react-dom/test-utils";

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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
console.log("API_BASE_URL:", API_BASE_URL);

type ClientResponseArray = {
  status: string;
  data: Client[];
  message: string;
};

type ClientResponse = {
  status: string;
  data: Client;
  message: string;
};

export const getClients = async (
  page: number,
  limit: number,
  name: string,
  divisions: string,
  highGrowth: boolean,
  activeDB: boolean
) => {
  try {
    const response = await axios.get<ClientResponseArray>(
      `${API_BASE_URL}/clients`,
      {
        params: {
          page,
          limit,
          name,
          divisions,
          highGrowth,
          activeDB,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw new Error("Error fetching clients");
  }
};

export const getClientById = async (id: number): Promise<Client> => {
  try {
    const response = await axios.get<ClientResponse>(
      `${API_BASE_URL}/clients/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching client by id:", error);
    throw new Error("Error fetching client by id");
  }
};

export const createClient = async (clientData: {
  name: string;
  owner_user_id: number;
  division: string;
  high_growth: boolean;
  imageURL: string;
  contractFile: string;
  joiningDate: string;
  experience: string;
  salary: string;
  additionalDetails: string;
}): Promise<Client> => {
  try {
    const response = await axios.post<ClientResponse>(
      `${API_BASE_URL}/clients`,
      clientData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer yourAuthToken`,
        },
      }
    );
    console.log("API response for createClient:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error creating client:", error);
    throw new Error("Error creating client");
  }
};

export const updateClient = async (clientData: {
  id: number;
  name: string;
  owner_user_id: number;
  division: string;
  high_growth: boolean;
  imageURL: string;
  contractFile: string;
  joiningDate: string;
  experience: string;
  salary: string;
  additionalDetails: string;
}): Promise<Client> => {
  try {
    const response = await axios.patch<ClientResponse>(
      `${API_BASE_URL}/clients/${clientData.id}`,
      clientData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer yourAuthToken`,
        },
      }
    );
    console.log("API response for updateClient:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error updating client:", error);
    throw new Error("Error updating client");
  }
};

export const deleteClient = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/clients/${id}`);
    console.log("Client deleted successfully:", id);
  } catch (error) {
    console.error("Error deleting client:", error);
    throw new Error("Error deleting client");
  }
};
