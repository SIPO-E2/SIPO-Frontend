import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const getAllJobPositions = async (): Promise<JobPosition[]> => {
 try {
    const response = await axios.get<JobPosition[]>(`${API_BASE_URL}/jobPositions`);
    return response.data;
 } catch (error) {
    throw new Error('Error al obtener las posiciones de trabajo');
 }
};

export const getJobPositionById = async (id: string): Promise<JobPosition> => {
 try {
    const response = await axios.get<JobPosition>(`${API_BASE_URL}/jobPositions/${id}`);
    return response.data;
 } catch (error) {
    throw new Error('Posición de trabajo no encontrada');
 }
};

export const createJobPosition = async (jobPositionData: JobPositionCreationAttributes): Promise<JobPosition> => {
 try {
    const response = await axios.post<JobPosition>(`${API_BASE_URL}/jobPositions`, jobPositionData);
    return response.data;
 } catch (error) {
    throw new Error('Error al crear la posición de trabajo');
 }
};

export const updateJobPosition = async (id: string, jobPositionData: JobPositionCreationAttributes): Promise<JobPosition> => {
 try {
    const response = await axios.put<JobPosition>(`${API_BASE_URL}/jobPositions/${id}`, jobPositionData);
    return response.data;
 } catch (error) {
    throw new Error('Error al actualizar la posición de trabajo');
 }
};

export const deleteJobPosition = async (id: string): Promise<void> => {
 try {
    await axios.delete(`${API_BASE_URL}/jobPositions/${id}`);
 } catch (error) {
    throw new Error('Error al eliminar la posición de trabajo');
 }
};
