import axios from 'axios';
import { Billing, BillingCreation, BillingUpdate, BillingResponse, BillingResponseArray } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;


export const getBilling = async (from = 0, to = 7): Promise<Billing[]> => {
    try {
        const response = await axios.get<BillingResponseArray>(`${API_BASE_URL}/billings?from=${from}&to=${to}`);
        return response.data.data.filter((billing) => billing.activeDB === true);
    } catch (error) {
        throw new Error('Error obtaining all billings');
    }
};

export const getBillingById = async (id: number): Promise<Billing> => {
    try {
        const response = await axios.get<BillingResponse>(`${API_BASE_URL}/billings/${id}`);
        return response.data.data;
    } catch (error) {
        throw new Error('Billing not found');
    }
};

export const createProject = async (billingData: BillingCreation): Promise<Billing> => {
    try {
        const response = await axios.post<BillingResponse>(`${API_BASE_URL}/billings`, billingData);
        return response.data.data;
    } catch (error) {
        throw new Error('Error creating billing');
    }
};

export const updateProject = async (id: number, billingData: BillingUpdate): Promise<Billing> => {
    try {
        const response = await axios.patch<BillingResponse>(`${API_BASE_URL}/billings/${id}`, billingData);
        return response.data.data;
    } catch (error) {
        throw new Error('Error updating billing');
    }
};

export const deleteBilling = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/billings/${id}`);
    } catch (error) {
        throw new Error('Error deleting billing');
    }
};

