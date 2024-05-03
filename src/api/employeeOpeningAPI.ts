import axios from 'axios';
import { EmployeeOpening, EmployeeOpeningCreation, EmployeeOpeningUpdate, EmployeeOpeningResponse, EmployeeOpeningResponseArray } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const getEmployeeOpenings = async (from = 0, to = 7): Promise<EmployeeOpening[]> => {
    try {
        const response = await axios.get<EmployeeOpeningResponseArray>(`${API_BASE_URL}/employeeOpenings?from=${from}&to=${to}`);
        return response.data.data.filter((employeeOpening) => employeeOpening.activeDB === true);
    } catch (error) {
        throw new Error('Error obtaining all employee opening');
    }
};

export const getEmployeeOpeningById = async (id: number): Promise<EmployeeOpening> => {
    try {
        const response = await axios.get<EmployeeOpeningResponse>(`${API_BASE_URL}/employeeOpenings/${id}`);
        return response.data.data;
    } catch (error) {
        throw new Error('Employee opening not found');
    }
};

export const createEmployeeOpening = async (employeeOpeningData: EmployeeOpeningCreation): Promise<EmployeeOpening> => {
    try {
        const response = await axios.post<EmployeeOpeningResponse>(`${API_BASE_URL}/employeeOpenings`, employeeOpeningData);
        return response.data.data;
    } catch (error) {
        throw new Error('Error creating user role');
    }
};

export const updateEmployeeOpening = async (id: number, EmployeeOpeningData: EmployeeOpeningUpdate): Promise<EmployeeOpening> => {
    try {
        const response = await axios.patch<EmployeeOpeningResponse>(`${API_BASE_URL}/employeeOpenings/${id}`, EmployeeOpeningData);
        return response.data.data;
    } catch (error) {
        throw new Error('Error updating employeeOpening');
    }
};

export const deleteEmployeeOpenings = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/employeeOpenings/${id}`);
    } catch (error) {
        throw new Error('Error deleting employeeOpening');
    }
};