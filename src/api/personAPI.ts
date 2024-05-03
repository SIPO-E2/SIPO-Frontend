import axios from 'axios';
import { Person, PersonCreation, PersonUpdate, PersonResponse, PersonResponseArray } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;


export const getPersons = async (from = 0, to = 7): Promise<Person[]> => {
    try {
        const response = await axios.get<PersonResponseArray>(`${API_BASE_URL}/persons?from=${from}&to=${to}`);
        return response.data.data.filter((person) => person.activeDB === true);
    } catch (error) {
        throw new Error('Error obtaining all persons');
    }
};

export const getPersonById = async (id: number): Promise<Person> => {
    try {
        const response = await axios.get<PersonResponse>(`${API_BASE_URL}/persons/${id}`);
        return response.data.data;
    } catch (error) {
        throw new Error('Person not found');
    }
};

export const createPerson = async (personData: PersonCreation): Promise<Person> => {
    try {
        const response = await axios.post<PersonResponse>(`${API_BASE_URL}/persons`, personData);
        return response.data.data;
    } catch (error) {
        throw new Error('Error creating person');
    }
};

export const updatePerson = async (id: number, personData: PersonUpdate): Promise<Person> => {
    try {
        const response = await axios.patch<PersonResponse>(`${API_BASE_URL}/persons/${id}`, personData);
        return response.data.data;
    } catch (error) {
        throw new Error('Error updating person');
    }
};

export const deletePersont = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/persons/${id}`);
    } catch (error) {
        throw new Error('Error deleting person');
    }
};

