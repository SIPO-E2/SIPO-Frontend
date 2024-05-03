import axios from 'axios';
import { CandidateResponse, CandidateResponseArray, Candidate, CandidateCreation, CandidateUpdate, CandidateStatus} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const getCandidates = async (): Promise<Candidate[]> => {
 try {
    const response = await axios.get<CandidateResponseArray>(`${API_BASE_URL}/candidates`);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al obtener los candidatos' + error);
 }
};

export const getCandidate = async (id: number): Promise<Candidate> => {
 try {
    const response = await axios.get<CandidateResponse>(`${API_BASE_URL}/candidates/${id}`);
    return response.data.data;
 } catch (error) {
    throw new Error('Candidato no encontrado');
 }
};

export const postCandidate = async (candidateData: CandidateCreation): Promise<Candidate> => {
 try {
   console.log(candidateData);
   
    const response = await axios.post<CandidateResponse>(`${API_BASE_URL}/candidates`, candidateData);
    console.log(response.data);
    
    return response.data.data;
 } catch (error) {
    throw new Error('Error al crear el candidato');
 }
};

export const updateCandidate = async (id: number, candidateData: CandidateUpdate): Promise<Candidate> => {
 try {
    const response = await axios.patch<CandidateResponse>(`${API_BASE_URL}/candidates/${id}`, candidateData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al actualizar el candidato');
 }
};

export const updateCandidateStatus = async (id: string, newStatus: CandidateStatus): Promise<void> => {
   try {
      const response = await axios.patch(`${API_BASE_URL}/candidates/${id}`, { status: newStatus });
      console.log(response.data); // Log response for debugging
   } catch (error) {
      throw new Error('Error updating candidate');
   }
};

export const deleteCandidate = async (id: number): Promise<void> => {
 try {
    await axios.delete(`${API_BASE_URL}/candidates/${id}`);
 } catch (error) {
    throw new Error('Error al eliminar el candidato');
 }
};