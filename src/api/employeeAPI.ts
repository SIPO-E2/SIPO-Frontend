import axios from 'axios';
import { Employee, EmployeeCreation, EmployeeUpdate, EmployeeResponse, EmployeeResponseArray } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;


export const getEmployees = async (from = 0, to = 7): Promise<Employee[]> => {
    try {
        const response = await axios.get<EmployeeResponseArray>(`${API_BASE_URL}/employees?from=${from}&to=${to}`);
        return response.data.data.filter((employee) => employee.activeDB === true);
    } catch (error) {
        throw new Error('Error obtaining all employees');
    }
};

export const getEmployeeById = async (id: number): Promise<Employee> => {
    try {
        const response = await axios.get<EmployeeResponse>(`${API_BASE_URL}/employees/${id}`);
        return response.data.data;
    } catch (error) {
        throw new Error('Employee not found');
    }
};

export const createEmployee = async (employeeData: EmployeeCreation): Promise<Employee> => {
    try {
        const response = await axios.post<EmployeeResponse>(`${API_BASE_URL}/employees`, employeeData);
        return response.data.data;
    } catch (error) {
        throw new Error('Error creating employee');
    }
};

export const updateEmployee = async (id: number, employeeData: EmployeeUpdate): Promise<Employee> => {
    try {
        const response = await axios.patch<EmployeeResponse>(`${API_BASE_URL}/employees/${id}`, employeeData);
        return response.data.data;
    } catch (error) {
        throw new Error('Error updating employee');
    }
};

export const deletePEmployee = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/employees/${id}`);
    } catch (error) {
        throw new Error('Error deleting employee');
    }
};

