import axios from 'axios';
import { UserRole, UserRoleCreation, UserRoleUpdate, UserRoleResponse, UserRoleResponseArray } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const getUserRoles = async (from = 0, to = 7): Promise<UserRole[]> => {
    try {
        const response = await axios.get<UserRoleResponseArray>(`${API_BASE_URL}/userRoles?from=${from}&to=${to}`);
        return response.data.data.filter((userRole) => userRole.activeDB === true);
    } catch (error) {
        throw new Error('Error obtaining all user roles');
    }
};

export const getUserRoleById = async (id: number): Promise<UserRole> => {
    try {
        const response = await axios.get<UserRoleResponse>(`${API_BASE_URL}/userRoles/${id}`);
        return response.data.data;
    } catch (error) {
        throw new Error('User role not found');
    }
};

export const createUserRole = async (userRoleData: UserRoleCreation): Promise<UserRole> => {
    try {
        const response = await axios.post<UserRoleResponse>(`${API_BASE_URL}/userRoles`, userRoleData);
        return response.data.data;
    } catch (error) {
        throw new Error('Error creating user role');
    }
};

export const updateUserRole = async (id: number, userRoleData: UserRoleUpdate): Promise<UserRole> => {
    try {
        const response = await axios.patch<UserRoleResponse>(`${API_BASE_URL}/userRoles/${id}`, userRoleData);
        return response.data.data;
    } catch (error) {
        throw new Error('Error updating user role');
    }
};

export const deleteUserRole = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/userRoles/${id}`);
    } catch (error) {
        throw new Error('Error deleting user role');
    }
};
