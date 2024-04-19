import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

type PersonResponseArray = {
   status: string;
   data: Person[];
   message: string;
}

type PersonResponse = {
   status: string;
   data: Person;
   message: string;
}

export const getPersons = async (): Promise<Person[]> => {
 try {
    const response = await axios.get<PersonResponseArray>(`${API_BASE_URL}/persons`);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al obtener los persons');
 }
};

export const getPipeline = async (id: string): Promise<PersonResponse> => {
 try {
     const response = await axios.get<PersonResponse>(`${API_BASE_URL}/persons/${id}`);
     return response.data;
 } catch (error) {
     throw new Error('persons no encontrado');
 }
};

export const createPipeline = async (pipelineData: PipelineCreationAttributes): Promise<Person> => {
 try {
    const response = await axios.post<PersonResponse>(`${API_BASE_URL}/persons`, pipelineData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al crear el persons');
 }
};

export const updatePipeline = async (id: string, pipelineData: PipelineCreationAttributes): Promise<Person> => {
 try {
    const response = await axios.put<PersonResponse>(`${API_BASE_URL}/persons/${id}`, pipelineData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al actualizar el persons');
 }
};

export const deletePipeline = async (id: string): Promise<void> => {
 try {
    await axios.delete(`${API_BASE_URL}/persons/${id}`);
 } catch (error) {
    throw new Error('Error al eliminar el persons');
 }
};
