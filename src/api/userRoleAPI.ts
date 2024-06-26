import axios from "axios";
import { UserRole, UserRoleResponse, UserRoleResponseArray } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const getUserRoles = async (): Promise<UserRole[]> => {
  try {
    const response = await axios.get<UserRoleResponseArray>(
      `${API_BASE_URL}/userRoles`
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error fetching user roles");
  }
};

export const getUserRoleById = async (id: number): Promise<UserRole> => {
  try {
    const response = await axios.get<UserRoleResponse>(
      `${API_BASE_URL}/userRoles/${id}`
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error fetching user role by id");
  }
};

export const createUserRole = async (userRoleData: {
  userId: number;
  roleId: string;
}): Promise<UserRole> => {
  try {
    const response = await axios.post<UserRoleResponse>(
      `${API_BASE_URL}/userRoles`,
      userRoleData
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error creating user role");
  }
};

export const updateUserRole = async (userRoleData: {
  id: number;
  userId: number;
  roleId: string;
}): Promise<UserRole> => {
  try {
    const response = await axios.patch<UserRoleResponse>(
      `${API_BASE_URL}/userRoles/${userRoleData.id}`,
      userRoleData
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error updating user role");
  }
};

export const deleteUserRole = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/userRoles/${id}`);
  } catch (error) {
    throw new Error("Error deleting user role");
  }
};
