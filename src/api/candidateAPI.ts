// candidateAPI.ts

import axios from 'axios';

const API_BASE_URL =  import.meta.env.VITE_API_BASE_URL as string;

export const getCandidates = async () => {
 try {
    const response = await axios.get(`${API_BASE_URL}/candidates`);
    return response.data;
 } catch (error) {
    throw new Error('Error al obtener los candidatos');
 }
};

export const getCandidate = async (id: string) => {
 try {
    const response = await axios.get(`${API_BASE_URL}/candidates/${id}`);
    return response.data;
 } catch (error) {
    throw new Error('Candidato no encontrado');
 }
};

export const createCandidate = async (candidateData: any) => {
 try {
    const response = await axios.post(`${API_BASE_URL}/candidates`, candidateData);
    return response.data;
 } catch (error) {
    throw new Error('Error al crear el candidato');
 }
};

export const updateCandidate = async (id: string, candidateData: any) => {
 try {
    const response = await axios.put(`${API_BASE_URL}/candidates/${id}`, candidateData);
    return response.data;
 } catch (error) {
    throw new Error('Error al actualizar el candidato');
 }
};

export const deleteCandidate = async (id: string) => {
 try {
    const response = await axios.delete(`${API_BASE_URL}/candidates/${id}`);
    return response.data;
 } catch (error) {
    throw new Error('Error al eliminar el candidato');
 }
};
