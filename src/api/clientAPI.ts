import axios from "axios";

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
  name = "",
  division = "",
  highGrowth = false
) => {
  const response = await axios.get(`${API_BASE_URL}/clients`, {
    params: { page, limit, name, division, highGrowth },
  });
  return response.data;
};

export const getClientById = async (id: number): Promise<Client> => {
  try {
    const response = await axios.get<ClientResponse>(
      `${API_BASE_URL}/clients/${id}`
    );
    console.log("API response for getClientById:", response.data);
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
  money: string;
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
  money: string;
  additionalDetails: string;
}): Promise<Client> => {
  try {
    const response = await axios.put<ClientResponse>(
      `${API_BASE_URL}/clients/${clientData.id}`,
      clientData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer yourAuthToken`, // Asegúrate de que la autenticación sea correcta y necesaria
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
