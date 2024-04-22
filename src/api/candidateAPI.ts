import axios from 'axios';
import { Candidate, CandidateCreationAttributes } from '../types/globals';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

type CandidateResponseArray = {
   status: string;
   data: Candidate[];
   message: string;
}

type CandidateResponse = {
   status: string;
   data: Candidate;
   message: string;
}

export const getCandidates = async (): Promise<Candidate[]> => {
 try {
    const response = await axios.get<CandidateResponseArray>(`${API_BASE_URL}/candidates`);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al obtener los candidatos');
 }
};

export const getCandidate = async (id: string): Promise<Candidate> => {
 try {
    const response = await axios.get<CandidateResponse>(`${API_BASE_URL}/candidates/${id}`);
    return response.data.data;
 } catch (error) {
    throw new Error('Candidato no encontrado');
 }
};

export const createCandidate = async (candidateData: CandidateCreationAttributes): Promise<Candidate> => {
 try {
    const response = await axios.post<CandidateResponse>(`${API_BASE_URL}/candidates`, candidateData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al crear el candidato');
 }
};

export const updateCandidate = async (id: number, candidateData: CandidateCreationAttributes): Promise<Candidate> => {
 try {
    const response = await axios.put<CandidateResponse>(`${API_BASE_URL}/candidates/${id}`, candidateData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al actualizar el candidato');
 }
};

export const deleteCandidate = async (id: number): Promise<void> => {
 try {
    await axios.delete(`${API_BASE_URL}/candidates/${id}`);
 } catch (error) {
    throw new Error('Error al eliminar el candidato');
 }
};