import axios from 'axios';
// Assuming you have the API base URL defined elsewhere
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

// Define the types for responses
type AllocationResponseArray = {
   status: string;
   data: Allocation[];
   message: string;
}

type AllocationResponse = {
   status: string;
   data: Allocation;
   message: string;
}

export enum AllocationStatus {
   Allocated = "Allocated",
   ClientInterview = "Client Interview",
   ClientFeedback = "Client Feedback"
}


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
export const getAllocation = async (id: string): Promise<Allocation> => {
 try {
    const response = await axios.get<AllocationResponse>(`${API_BASE_URL}/allocations/${id}`);
    return response.data.data;
 } catch (error) {
    throw new Error('Asignación no encontrada');
 }
};

// Function to create a new allocation
export const createAllocation = async (allocationData: AllocationCreationAttributes): Promise<Allocation> => {
 try {
    const response = await axios.post<AllocationResponse>(`${API_BASE_URL}/allocations`, allocationData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al crear la asignación');
 }
};

//Function to update an allocation
export const updateAllocation = async (id: string, newStatus: AllocationStatus): Promise<void> => {
   try {
      const response = await axios.patch(`${API_BASE_URL}/allocations/${id}`, { status: newStatus });
      console.log(response.data); // Log response for debugging
   } catch (error) {
      throw new Error('Error updating allocation');
   }
};

// Function to delete an allocation by ID
export const deleteAllocation = async (id: string): Promise<void> => {
 try {
    await axios.delete(`${API_BASE_URL}/allocations/${id}`);
 } catch (error) {
    throw new Error('Error al eliminar la asignación');
 }
};
