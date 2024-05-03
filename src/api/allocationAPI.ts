import axios from 'axios';
import { Allocation, AllocationStatus, AllocationCreation, AllocationResponse, AllocationResponseArray} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

// Function to fetch all allocations
export const getAllocations = async (): Promise<Allocation[]> => {
 try {
    const response = await axios.get<AllocationResponseArray>(`${API_BASE_URL}/allocations`);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al obtener las asignaciones');
 }
};

// Function to fetch a single allocation by ID
export const getAllocation = async (id: number): Promise<Allocation> => {
 try {
    const response = await axios.get<AllocationResponse>(`${API_BASE_URL}/allocations/${id}`);
    return response.data.data;
 } catch (error) {
    throw new Error('Asignación no encontrada');
 }
};

// Function to create a new allocation
export const createAllocation = async (allocationData: AllocationCreation): Promise<Allocation> => {
 try {
    const response = await axios.post<AllocationResponse>(`${API_BASE_URL}/allocations`, allocationData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al crear la asignación');
 }
};

//Function to update an allocation
export const updateAllocation = async (clientId: number, jobPositionId: number, newStatus: AllocationStatus): Promise<void> => {
   try {
      const response = await axios.patch(`${API_BASE_URL}/allocations/${clientId}/${jobPositionId}`, { status: newStatus });
      console.log(response.data);
   } catch (error) {
      throw new Error('Error updating allocation');
   }
};

export const deleteAllocation = async (clientId: number, jobPositionId: number): Promise<void> => {
   try {
       await axios.delete(`${API_BASE_URL}/allocations/${clientId}/${jobPositionId}`);
   } catch (error) {
       throw new Error('Error deleting allocation');
   }
};
