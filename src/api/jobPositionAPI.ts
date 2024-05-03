
import axios from 'axios';
import { JobPosition, JobPositionCreation, JobPositionResponse, JobPositionResponseArray, JobPositionUpdate } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;


export const getAllJobPositions = async (): Promise<JobPosition[]> => {
 try {
    const response = await axios.get<JobPositionResponseArray>(`${API_BASE_URL}/jobPositions`);
    console.log(response);
    
    return response.data.data;
 } catch (error) {
    throw new Error('Error al obtener las posiciones de trabajo');
 }
};

export const getJobPositionById = async (id: number): Promise<JobPosition> => {
 try {
    const response = await axios.get<JobPositionResponse>(`${API_BASE_URL}/jobPositions/${id}`);
    return response.data.data;
 } catch (error) {
    throw new Error('Posición de trabajo no encontrada');
 }
};

export const createJobPosition = async (jobPositionData: JobPositionCreation): Promise<JobPosition> => {
 try {
    const response = await axios.post<JobPositionResponse>(`${API_BASE_URL}/jobPositions`, jobPositionData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al crear la posición de trabajo');
 }
};

export const updateJobPosition = async (id: number, jobPositionData: JobPositionUpdate): Promise<JobPosition> => {
 try {
    const response = await axios.put<JobPositionResponse>(`${API_BASE_URL}/jobPositions/${id}`, jobPositionData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al actualizar la posición de trabajo');
 }
};

export const deleteJobPosition = async (id: number): Promise<void> => {
 try {
    await axios.delete(`${API_BASE_URL}/jobPositions/${id}`);
 } catch (error) {
    throw new Error('Error al eliminar la posición de trabajo');
 }
};

