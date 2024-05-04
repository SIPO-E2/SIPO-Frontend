import axios from 'axios';
import { Billing, BillingCreation, BillingUpdate, BillingResponse, BillingResponseArray  } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const getBillings = async (from = 0, to = 100): Promise<Billing[]> => {
 try {
    const response = await axios.get<BillingResponseArray>(`${API_BASE_URL}/billings?from=${from}&to=${to}`);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al obtener los candidatos');
 }
};

export const getBilling = async (id: number): Promise<BillingResponse> => {
 try {
    const response = await axios.get<BillingResponse>(`${API_BASE_URL}/billings/${id}`);
    return response.data;
 } catch (error) {
    throw new Error('Billing no encontrado');
 }
};

export const postBilling = async (billingData: BillingCreation): Promise<Billing> => {
 try {
    const response = await axios.post<BillingResponse>(`${API_BASE_URL}/billings`, billingData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al crear el candidato');
 }
};

export const updateBilling = async (id: number, billingData: BillingUpdate): Promise<Billing> => {
 try {
    const response = await axios.patch<BillingResponse>(`${API_BASE_URL}/billings/${id}`, billingData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al actualizar el Billing');
 }
};

export const deleteBilling = async (id: number): Promise<void> => {
 try {
    await axios.delete(`${API_BASE_URL}/billings/${id}`);
 } catch (error) {
    throw new Error('Error al eliminar el candidato');
 }
};