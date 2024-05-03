import axios from 'axios';
import { JobPosition, JobPositionCreation, JobPositionUpdate, JobPositionResponse, JobPositionResponseArray } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;


export const getJobPositions = async (from = 0, to = 7): Promise<JobPosition[]> => {
    try {
        const response = await axios.get<JobPositionResponseArray>(`${API_BASE_URL}/jobPositions?from=${from}&to=${to}`);
        return response.data.data.filter((jobPosition) => jobPosition.activeDB === true);
    } catch (error) {
        throw new Error('Error obtaining all job positions');
    }
};

export const getJobPositionById = async (id: number): Promise<JobPosition> => {
    try {
        const response = await axios.get<JobPositionResponse>(`${API_BASE_URL}/jobPositions/${id}`);
        return response.data.data;
    } catch (error) {
        throw new Error('Job position not found');
    }
};

export const createJobPosition = async (jobPositionData: JobPositionCreation): Promise<JobPosition> => {
    try {
        const response = await axios.post<JobPositionResponse>(`${API_BASE_URL}/jobPositions`, jobPositionData);
        return response.data.data;
    } catch (error) {
        throw new Error('Error creating job position');
    }
};

export const updateJobPosition = async (id: number, jobPositionData: JobPositionUpdate): Promise<JobPosition> => {
    try {
        const response = await axios.patch<JobPositionResponse>(`${API_BASE_URL}/jobPositions/${id}`, jobPositionData);
        return response.data.data;
    } catch (error) {
        throw new Error('Error updating job position');
    }
};

export const deleteJobPosition = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/jobPositions/${id}`);
    } catch (error) {
        throw new Error('Error deleting job position');
    }
};

