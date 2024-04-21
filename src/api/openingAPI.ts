import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

type OpeningsResponseArray = {
   status: string;
   data: Opening[];
   message: string;
}

type OpeningResponse = {
   status: string;
   data: Opening;
   message: string;
}

export const getOpenings = async (): Promise<Opening[]> => {
 try {
    const response = await axios.get<OpeningsResponseArray>(`${API_BASE_URL}/openings`);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al obtener los candidatos');
 }
};

export const getOpening = async (id: string): Promise<Opening> => {
 try {
    const response = await axios.get<OpeningResponse>(`${API_BASE_URL}/openings/${id}`);
    return response.data.data;
 } catch (error) {
    throw new Error('Candidato no encontrado');
 }
};

export const createOpening = async (openingData: OpeningCreationAttributes): Promise<Opening> => {
 try {
    const response = await axios.post<OpeningResponse>(`${API_BASE_URL}/openings`, openingData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al crear el candidato');
 }
};

export const updateOpening = async (id: string, openingData: OpeningCreationAttributes): Promise<Opening> => {
 try {
    const response = await axios.put<OpeningResponse>(`${API_BASE_URL}/openings/${id}`, openingData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al actualizar el candidato');
 }
};

export const deleteOpening = async (id: string): Promise<void> => {
 try {
    await axios.delete(`${API_BASE_URL}/openings/${id}`);
 } catch (error) {
    throw new Error('Error al eliminar el candidato');
 }
};

