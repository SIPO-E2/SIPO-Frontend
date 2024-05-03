import axios from 'axios';
import { Candidate, CandidateCreation, CandidateUpdate, CandidateResponse, CandidateResponseArray } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;


export const getCandidates = async (from = 0, to = 7): Promise<Candidate[]> => {
    try {
        const response = await axios.get<CandidateResponseArray>(`${API_BASE_URL}/candidates?from=${from}&to=${to}`);
        return response.data.data.filter((candidate) => candidate.activeDB === true);
    } catch (error) {
        throw new Error('Error obtaining all candidates');
    }
};

export const getCandidateById = async (id: number): Promise<Candidate> => {
    try {
        const response = await axios.get<CandidateResponse>(`${API_BASE_URL}/candidates/${id}`);
        return response.data.data;
    } catch (error) {
        throw new Error('Candidate not found');
    }
};

export const createCandidate = async (candidateData: CandidateCreation): Promise<Candidate> => {
    try {
        const response = await axios.post<CandidateResponse>(`${API_BASE_URL}/candidates`, candidateData);
        return response.data.data;
    } catch (error) {
        throw new Error('Error creating candidate');
    }
};

export const updateCandidate = async (id: number, candidateData: CandidateUpdate): Promise<Candidate> => {
    try {
        const response = await axios.patch<CandidateResponse>(`${API_BASE_URL}/candidates/${id}`, candidateData);
        return response.data.data;
    } catch (error) {
        throw new Error('Error updating candidate');
    }
};

export const deleteCandidate = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/candidates/${id}`);
    } catch (error) {
        throw new Error('Error deleting candidate');
    }
};

