import axios from 'axios';
import { Person, PersonResponse, PersonResponseArray, PersonCreation, PersonUpdate } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const getPersons = async (): Promise<Person[]> => {
 try {
    const response = await axios.get<PersonResponseArray>(`${API_BASE_URL}/persons`);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al obtener los persons');
 }
};

export const getPerson = async (id: number): Promise<PersonResponse> => {
 try {
     const response = await axios.get<PersonResponse>(`${API_BASE_URL}/persons/${id}`);
     return response.data;
 } catch (error) {
     throw new Error('persons no encontrado');
 }
};

export const createPerson = async (pipelineData: PersonCreation): Promise<Person> => {
 try {
    const response = await axios.post<PersonResponse>(`${API_BASE_URL}/persons`, pipelineData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al crear el persons');
 }
};

export const updatePerson = async (id: number, pipelineData: PersonUpdate): Promise<Person> => {
 try {
    const response = await axios.patch<PersonResponse>(`${API_BASE_URL}/persons/${id}`, pipelineData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al actualizar el persons');
 }
};

export const deletePerson = async (id: number): Promise<void> => {
 try {
    await axios.delete(`${API_BASE_URL}/persons/${id}`);
 } catch (error) {
    throw new Error('Error al eliminar el persons');
 }
};