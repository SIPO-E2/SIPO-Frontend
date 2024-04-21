import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

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
    return response.data.data;
  } catch (error) {
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
    throw new Error("Error fetching client by id");
  }
};

export const createClient = async (client: Client): Promise<Client> => {
  try {
    const response = await axios.post<ClientResponse>(
      `${API_BASE_URL}/clients`,
      client
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error creating client");
  }
};

export const updateClient = async (client: Client): Promise<Client> => {
  try {
    const response = await axios.put<ClientResponse>(
      `${API_BASE_URL}/clients/${client.id}`,
      client
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error updating client");
  }
};

export const deleteClient = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/clients/${id}`);
  } catch (error) {
    throw new Error("Error deleting client");
  }
};
