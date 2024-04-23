import axios from 'axios';
// import api from ".";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

type JobPositionResponseArray = {
      status: string;
      data: JobPosition[];
      message: string;
   };

type JobPositionResponse = {
      status: string;
      data: JobPosition;
      message: string;
   };

export const getAllJobPositions = async (): Promise<JobPosition[]> => {
 try {
    const response = await axios.get<JobPositionResponseArray>(`${API_BASE_URL}/jobPositions`);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al obtener las posiciones de trabajo');
 }
};

export const getJobPositionById = async (id: string): Promise<JobPosition> => {
 try {
    const response = await axios.get<JobPositionResponse>(`${API_BASE_URL}/jobPositions/${id}`);
    return response.data.data;
 } catch (error) {
    throw new Error('Posición de trabajo no encontrada');
 }
};

export const createJobPosition = async (jobPositionData: JobPositionCreationAttributes): Promise<JobPosition> => {
 try {
    const response = await axios.post<JobPositionResponse>(`${API_BASE_URL}/jobPositions`, jobPositionData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al crear la posición de trabajo');
 }
};

export const updateJobPosition = async (id: string, jobPositionData: JobPositionCreationAttributes): Promise<JobPosition> => {
 try {
    const response = await axios.put<JobPositionResponse>(`${API_BASE_URL}/jobPositions/${id}`, jobPositionData);
    return response.data.data;
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
