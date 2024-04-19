import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

type BillingResponseArray = {
   status: string;
   data: Billing[];
   message: string;
}

type BillingResponse = {
   status: string;
   data: Billing;
   message: string;
}

export const getAllBillings = async (): Promise<Billing[]> => {
 try {
    const response = await axios.get<BillingResponseArray>(`${API_BASE_URL}/billings`);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al obtener los candidatos');
 }
};

export const getBilling = async (id: string): Promise<Billing> => {
 try {
    const response = await axios.get<BillingResponse>(`${API_BASE_URL}/billings/${id}`);
    return response.data.data;
 } catch (error) {
    throw new Error('Candidato no encontrado');
 }
};

export const createBilling = async (billingData: BillingCreationAttributes): Promise<Billing> => {
 try {
    const response = await axios.post<BillingResponse>(`${API_BASE_URL}/billings`, billingData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al crear el candidato');
 }
};

export const updateBilling = async (id: string, billingData: BillingCreationAttributes): Promise<Billing> => {
 try {
    const response = await axios.put<BillingResponse>(`${API_BASE_URL}/billings/${id}`, billingData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al actualizar el candidato');
 }
};

export const deleteBilling = async (id: string): Promise<void> => {
 try {
    await axios.delete(`${API_BASE_URL}/billings/${id}`);
 } catch (error) {
    throw new Error('Error al eliminar el candidato');
 }
};
