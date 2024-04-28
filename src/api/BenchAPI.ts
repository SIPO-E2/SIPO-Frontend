import axios from 'axios';
import { Bench, BenchCreationAttributes } from '../types/globals';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

type BenchResponseArray = {
   status: string;
   data: Bench[];
   message: string;
}

type BenchResponse = {
   status: string;
   data: Bench;
   message: string;
}

export const getBenches = async (): Promise<Bench[]> => {
 try {
    const response = await axios.get<BenchResponseArray>(`${API_BASE_URL}/benches`);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al obtener los candidatos');
 }
};

export const getBench = async (id: string): Promise<Bench> => {
 try {
    const response = await axios.get<BenchResponse>(`${API_BASE_URL}/benches/${id}`);
    return response.data.data;
 } catch (error) {
    throw new Error('Candidato no encontrado');
 }
};

export const postBench = async (benchData: BenchCreationAttributes): Promise<Bench> => {
 try {
    const response = await axios.post<BenchResponse>(`${API_BASE_URL}/benches`, benchData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al crear el candidato');
 }
};

export const updateBench = async (id: string, benchData: BenchCreationAttributes): Promise<Bench> => {
 try {
    const response = await axios.patch<BenchResponse>(`${API_BASE_URL}/benches/${id}`, benchData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al actualizar el candidato');
 }
};

export const deleteBench = async (id: string): Promise<void> => {
 try {
    await axios.delete(`${API_BASE_URL}/benches/${id}`);
 } catch (error) {
    throw new Error('Error al eliminar el candidato');
 }
};
