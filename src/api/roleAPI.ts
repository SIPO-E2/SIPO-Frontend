import axios from 'axios';
import { Role, RoleCreation, RoleUpdate, RoleResponse, RoleResponseArray } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const getRoles = async (from = 0, to = 7): Promise<Role[]> => {
    try {
        const response = await axios.get<RoleResponseArray>(`${API_BASE_URL}/roles?from=${from}&to=${to}`);
        return response.data.data.filter((role) => role.activeDB === true);
    } catch (error) {
        throw new Error('Error obtaining all roles');
    }
};

export const getRoleById = async (id: number): Promise<Role> => {
    try {
        const response = await axios.get<RoleResponse>(`${API_BASE_URL}/roles/${id}`);
        return response.data.data;
    } catch (error) {
        throw new Error('Role not found');
    }
};

export const createRole = async (roleData: RoleCreation): Promise<Role> => {
    try {
        const response = await axios.post<RoleResponse>(`${API_BASE_URL}/roles`, roleData);
        return response.data.data;
    } catch (error) {
        throw new Error('Error creating role');
    }
};

export const updateRole = async (id: number, roleData: RoleUpdate): Promise<Role> => {
    try {
        const response = await axios.patch<RoleResponse>(`${API_BASE_URL}/roles/${id}`, roleData);
        return response.data.data;
    } catch (error) {
        throw new Error('Error updating role');
    }
};

export const deleteRole = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/roles/${id}`);
    } catch (error) {
        throw new Error('Error deleting role');
    }
};
