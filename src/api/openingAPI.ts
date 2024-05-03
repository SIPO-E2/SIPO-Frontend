import axios from 'axios';
import { Opening, OpeningCreation, OpeningUpdate, OpeningResponse, OpeningsResponseArray } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;


export const getOpenings = async (from = 0, to = 7): Promise<Opening[]> => {
    try {
        const response = await axios.get<OpeningsResponseArray>(`${API_BASE_URL}/openings?from=${from}&to=${to}`);
        return response.data.data.filter((opening) => opening.activeDB === true);
    } catch (error) {
        throw new Error('Error obtaining all openings');
    }
};

export const getOpeningsById = async (id: number): Promise<Opening> => {
    try {
        const response = await axios.get<OpeningResponse>(`${API_BASE_URL}/openings/${id}`);
        return response.data.data;
    } catch (error) {
        throw new Error('Opening not found');
    }
};

export const createOpening = async (openingData: OpeningCreation): Promise<Opening> => {
    try {
        const response = await axios.post<OpeningResponse>(`${API_BASE_URL}/openings`, openingData);
        return response.data.data;
    } catch (error) {
        throw new Error('Error creating opening');
    }
};

export const updateOpening = async (id: number, openingData: OpeningUpdate): Promise<Opening> => {
    try {
        const response = await axios.patch<OpeningResponse>(`${API_BASE_URL}/openings/${id}`, openingData);
        return response.data.data;
    } catch (error) {
        throw new Error('Error updating opening');
    }
};

export const deleteOpening = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/openings/${id}`);
    } catch (error) {
        throw new Error('Error deleting opening');
    }
};

