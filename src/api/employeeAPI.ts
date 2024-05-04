import axios from 'axios';
import { Employee, EmployeeCreation, EmployeeUpdate } from '../types/entities';
import { EmployeeResponse, EmployeeResponseArray } from '../types/responseTypes';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const getEmployees = async (from = 0, to = 100): Promise<Employee[]> => {
 try {
    const response = await axios.get<EmployeeResponseArray>(`${API_BASE_URL}/employees?from=${from}&to=${to}`);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al obtener los empleados');
 }
};

export const getEmployee = async (id: number): Promise<EmployeeResponse> => {
 try {
    const response = await axios.get<EmployeeResponse>(`${API_BASE_URL}/employees/${id}`);
    return response.data;
 } catch (error) {
    throw new Error('Empleado no encontrado');
 }
};

export const postEmployee = async (employeeData: EmployeeCreation): Promise<Employee> => {
 try {
    const response = await axios.post<EmployeeResponse>(`${API_BASE_URL}/employees`, employeeData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al crear el empleado');
 }
};

export const updateEmployee = async (id: number, employeeData: EmployeeUpdate): Promise<Employee> => {
 try {
    const response = await axios.patch<EmployeeResponse>(`${API_BASE_URL}/employees/${id}`, employeeData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al actualizar el empleado');
 }
};

export const deleteEmployee = async (id: number): Promise<void> => {
 try {
    await axios.delete(`${API_BASE_URL}/employees/${id}`);
 } catch (error) {
    throw new Error('Error al eliminar el empleado');
 }
};