import axios from "axios";
// import { User, UserResponse, UserResponseArray } from "../types";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  profileImage: string;
  // clients: Client[];
  // projects: Project[];
  // roles: Role[];
  activeDB: boolean;
}

export type UserResponseArray = {
  status: string;
  data: User[];
  message: string;
};

export type UserResponse = {
  status: string;
  data: User;
  message: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const getUsers = async (
  page: number,
  limit: number,
  name: string,
  activeDB: boolean
) => {
  try {
    const response = await axios.get<UserResponseArray>(
      `${API_BASE_URL}/users`,
      {
        params: {
          page,
          limit,
          name,
          activeDB,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Error fetching users");
  }
};

export const getUserById = async (id: number): Promise<User> => {
  try {
    const response = await axios.get<UserResponse>(
      `${API_BASE_URL}/users/${id}`
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error fetching user by id");
  }
};

export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
  profileImage: string;
}): Promise<User> => {
  try {
    const response = await axios.post<UserResponse>(
      `${API_BASE_URL}/users`,
      userData
    );
    return response.data.data; // Asegúrate de que esto refleje la estructura real de la respuesta
  } catch (error) {
    const response = await axios.post<UserResponse>(
      `${API_BASE_URL}/users`,
      userData
    );
    console.log("API response:", response.data); // Esto te ayudará a ver la estructura real

    console.error("Error creating user:", error);
    throw new Error("Error creating user");
  }
};

export const updateUser = async (userData: {
  id: number;
  name: string;
  email: string;
  password: string;
  profileImage: string;
}): Promise<User> => {
  try {
    const response = await axios.patch<UserResponse>(
      `${API_BASE_URL}/users/${userData.id}`,
      userData
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error updating user");
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/users/${id}`);
  } catch (error) {
    throw new Error("Error deleting user");
  }
};
