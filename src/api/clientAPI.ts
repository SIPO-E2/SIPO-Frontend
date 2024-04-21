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

export const getClients = async (): Promise<Client[]> => {
  try {
    const response = await axios.get<ClientResponseArray>(
      `${API_BASE_URL}/clients`
    );
    console.log("API response for getClients:", response.data); // Log the whole response object to inspect
    return response.data.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.error("Response error details:", error.response.data);
    }
    throw new Error("Error fetching clients");
  }
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

export const createClient = async (client: Client): Promise<Client> => {
  try {
    const response = await axios.post<ClientResponse>(
      `${API_BASE_URL}/clients`,
      client
    );
    console.log("API response for createClient:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error creating client:", error);
    throw new Error("Error creating client");
  }
};

export const updateClient = async (client: Client): Promise<Client> => {
  try {
    const response = await axios.put<ClientResponse>(
      `${API_BASE_URL}/clients/${client.id}`,
      client
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
