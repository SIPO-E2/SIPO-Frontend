import axios from 'axios';
import { Bench, BenchCreation, BenchUpdate } from '../types/entities';
import { BenchResponse, BenchResponseArray } from '../types/responseTypes';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const getBenches = async (): Promise<Bench[]> => {
 try {
    const response = await axios.get<BenchResponseArray>(`${API_BASE_URL}/benches`);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al obtener los candidatos');
 }
};

export const getBench = async (id: string): Promise<BenchResponse> => {
 try {
    const response = await axios.get<BenchResponse>(`${API_BASE_URL}/benches/${id}`);
    return response.data;
 } catch (error) {
    throw new Error('Candidato no encontrado');
 }
};

export const postBench = async (benchData: BenchCreation): Promise<Bench> => {
 try {
    const response = await axios.post<BenchResponse>(`${API_BASE_URL}/benches`, benchData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al crear el candidato');
 }
};

export const updateBench = async (id: string, benchData: BenchUpdate): Promise<Bench> => {
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