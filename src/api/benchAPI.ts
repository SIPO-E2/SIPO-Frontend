import axios from 'axios';
import { Bench, BenchCreation, BenchUpdate, BenchResponse, BenchResponseArray  } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const getBenches = async (): Promise<Bench[]> => {
 try {
    const response = await axios.get<BenchResponseArray>(`${API_BASE_URL}/benches`);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al obtener los Bench');
 }
};

export const getBench = async (id: number): Promise<BenchResponse> => {
 try {
    const response = await axios.get<BenchResponse>(`${API_BASE_URL}/benches/${id}`);
    return response.data;
 } catch (error) {
    throw new Error('Bench no encontrado');
 }
};

export const postBench = async (benchData: BenchCreation): Promise<Bench> => {
 try {
    const response = await axios.post<BenchResponse>(`${API_BASE_URL}/benches`, benchData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al crear el Bench');
 }
};

export const updateBench = async (id: number, benchData: BenchUpdate): Promise<Bench> => {
 try {
    const response = await axios.patch<BenchResponse>(`${API_BASE_URL}/benches/${id}`, benchData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al actualizar el Bench');
 }
};

export const deleteBench = async (id: number): Promise<void> => {
 try {
    await axios.delete(`${API_BASE_URL}/benches/${id}`);
 } catch (error) {
    throw new Error('Error al eliminar el candidato');
 }
};