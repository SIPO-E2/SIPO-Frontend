import axios from 'axios';
import { Client, ClientCreation, ClientUpdate, ClientResponse, ClientResponseArray } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;


export const getClients = async (from = 0, to = 7): Promise<Client[]> => {
    try {
        const response = await axios.get<ClientResponseArray>(`${API_BASE_URL}/clients?from=${from}&to=${to}`);
        return response.data.data.filter((client) => client.activeDB === true);
    } catch (error) {
        throw new Error('Error obtaining all clients');
    }
};

export const getClientById = async (id: number): Promise<Client> => {
    try {
        const response = await axios.get<ClientResponse>(`${API_BASE_URL}/clients/${id}`);
        return response.data.data;
    } catch (error) {
        throw new Error('Client not found');
    }
};

export const createlient = async (clientData: ClientCreation): Promise<Client> => {
    try {
        const response = await axios.post<ClientResponse>(`${API_BASE_URL}/clients`, clientData);
        return response.data.data;
    } catch (error) {
        throw new Error('Error creating client');
    }
};

export const updateClient = async (id: number, clientData: ClientUpdate): Promise<Client> => {
    try {
        const response = await axios.patch<ClientResponse>(`${API_BASE_URL}/clients/${id}`, clientData);
        return response.data.data;
    } catch (error) {
        throw new Error('Error updating client');
    }
};

export const deleteClient = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/clients/${id}`);
    } catch (error) {
        throw new Error('Error deleting client');
    }
};