import axios from 'axios';
import { User, UserCreation, UserUpdate, UserResponse, UserResponseArray } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const getUsers = async (from = 0, to = 7): Promise<User[]> => {
    try {
        const response = await axios.get<UserResponseArray>(`${API_BASE_URL}/users?from=${from}&to=${to}`);
        return response.data.data.filter((user) => user.activeDB === true);
    } catch (error) {
        throw new Error('Error obtaining all users');
    }
};

export const getUserById = async (id: number): Promise<User> => {
    try {
        const response = await axios.get<UserResponse>(`${API_BASE_URL}/users/${id}`);
        return response.data.data;
    } catch (error) {
        throw new Error('User not found');
    }
};

export const createUser = async (userData: UserCreation): Promise<User> => {
    try {
        const response = await axios.post<UserResponse>(`${API_BASE_URL}/users`, userData);
        return response.data.data;
    } catch (error) {
        throw new Error('Error creating user');
    }
};

export const updateUser = async (id: number, userData: UserUpdate): Promise<User> => {
    try {
        const response = await axios.patch<UserResponse>(`${API_BASE_URL}/users/${id}`, userData);
        return response.data.data;
    } catch (error) {
        throw new Error('Error updating user');
    }
};

export const deleteUser = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/users/${id}`);
    } catch (error) {
        throw new Error('Error deleting user');
    }
};
