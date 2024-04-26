import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

type PersonResponseArray = {
    status: string;
    data: Person[];
    message: string;
};

type PersonResponse = {
    status: string;
    data: Person;
    message: string;
};

export const getAllPersons = async (): Promise<Person[]> => {
    try {
        const response = await axios.get<PersonResponseArray>(`${API_BASE_URL}/persons`);
        return response.data.data;
    } catch (error) {
        throw new Error('Error retrieving persons');
    }
};

export const getPersonById = async (id: string): Promise<Person> => {
    try {
        const response = await axios.get<PersonResponse>(`${API_BASE_URL}/persons/${id}`);
        return response.data.data;
    } catch (error) {
        throw new Error('Person not found');
    }
};

export const createPerson = async (personData: PersonCreationAttributes): Promise<Person> => {
    try {
        const response = await axios.post<PersonResponse>(`${API_BASE_URL}/persons`, personData);
        return response.data.data;
    } catch (error) {
        throw new Error('Error creating person');
    }
};

export const updatePerson = async (id: string, personData: PersonCreationAttributes): Promise<Person> => {
    try {
        const response = await axios.put<PersonResponse>(`${API_BASE_URL}/persons/${id}`, personData);
        return response.data.data;
    } catch (error) {
        throw new Error('Error updating person');
    }
};

export const deletePerson = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/persons/${id}`);
    } catch (error) {
        throw new Error('Error deleting person');
    }
};
