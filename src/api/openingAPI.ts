import axios from 'axios';
import { Opening, OpeningCreation, OpeningUpdate, OpeningResponse, OpeningsResponseArray } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const getOpenings = async (): Promise<Opening[]> => {
 try {
    const response = await axios.get<OpeningsResponseArray>(`${API_BASE_URL}/openings`);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al obtener los candidatos');
 }
};

export const getOpening = async (id: number): Promise<Opening> => {
 try {
    const response = await axios.get<OpeningResponse>(`${API_BASE_URL}/openings/${id}`);
    return response.data.data;
 } catch (error) {
    throw new Error('Candidato no encontrado');
 }
};

export const createOpening = async (openingData: OpeningCreation): Promise<Opening> => {
 try {
    const response = await axios.post<OpeningResponse>(`${API_BASE_URL}/openings`, openingData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al crear el candidato');
 }
};

export const updateOpening = async (id: number, openingData: OpeningUpdate): Promise<Opening> => {
 try {
    const response = await axios.put<OpeningResponse>(`${API_BASE_URL}/openings/${id}`, openingData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al actualizar el candidato');
 }
};

export const deleteOpening = async (id: number): Promise<void> => {
 try {
    await axios.delete(`${API_BASE_URL}/openings/${id}`);
 } catch (error) {
    throw new Error('Error al eliminar el candidato');
 }
};

