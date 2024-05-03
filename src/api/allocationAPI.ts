import axios from 'axios';
import { Allocation, AllocationCreation, AllocationUpdate, AllocationResponse, AllocationResponseArray } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;


export const getAllocations = async (from = 0, to = 7): Promise<Allocation[]> => {
    try {
        const response = await axios.get<AllocationResponseArray>(`${API_BASE_URL}/allocations?from=${from}&to=${to}`);
        return response.data.data.filter((allocation) => allocation.activeDB === true);
    } catch (error) {
        throw new Error('Error obtaining all allocations');
    }
};

export const getAllocationById = async (id: number): Promise<Allocation> => {
    try {
        const response = await axios.get<AllocationResponse>(`${API_BASE_URL}/allocations/${id}`);
        return response.data.data;
    } catch (error) {
        throw new Error('Allocation not found');
    }
};

export const createAllocation = async (allocationData: AllocationCreation): Promise<Allocation> => {
    try {
        const response = await axios.post<AllocationResponse>(`${API_BASE_URL}/allocations`, allocationData);
        return response.data.data;
    } catch (error) {
        throw new Error('Error creating allocation');
    }
};

export const updateAllocation = async (id: number, allocationData: AllocationUpdate): Promise<Allocation> => {
    try {
        const response = await axios.patch<AllocationResponse>(`${API_BASE_URL}/allocations/${id}`, allocationData);
        return response.data.data;
    } catch (error) {
        throw new Error('Error updating allocation');
    }
};

export const deleteAllocations = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/allocations/${id}`);
    } catch (error) {
        throw new Error('Error deleting allocation');
    }
};

