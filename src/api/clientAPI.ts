import axios from 'axios';
import { Client, ClientUpdate, ClientCreation} from '../types';
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

export const getAllClients = async (): Promise<Client[]> => {
  try {
    const response = await axios.get<ClientResponseArray>(`${API_BASE_URL}/clients`);
    return response.data.data;
  } catch (error) {
    throw new Error('Error al obtener los clientes');
  }
};

export const getClientById = async (id: string): Promise<Client> => {
  try {
    const response = await axios.get<ClientResponse>(`${API_BASE_URL}/clients/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Cliente no encontrado');
  }
};

export const createClient = async (clientData: ClientCreation): Promise<Client> => {
  try {
    const response = await axios.post<ClientResponse>(`${API_BASE_URL}/clients`, clientData);
    return response.data.data;
  } catch (error) {
    throw new Error('Error al crear el cliente');
  }
};

export const updateClient = async (id: string, clientData: ClientUpdate): Promise<Client> => {
  try {
    const response = await axios.put<ClientResponse>(`${API_BASE_URL}/clients/${id}`, clientData);
    return response.data.data;
  } catch (error) {
    throw new Error('Error al actualizar el cliente');
  }
};

export const deleteClient = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/clients/${id}`);
  } catch (error) {
    throw new Error('Error al eliminar el cliente');
  }
};
