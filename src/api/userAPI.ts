import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

type UserResponseArray = {
  status: string;
  data: User[];
  message: string;
};

type UserResponse = {
  status: string;
  data: User;
  message: string;
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<UserResponseArray>(
      `${API_BASE_URL}/users`
    );
    return response.data.data;
  } catch (error) {
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

export const createUser = async (user: User): Promise<User> => {
  try {
    const response = await axios.post<UserResponse>(
      `${API_BASE_URL}/users`,
      user
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error creating user");
  }
};

export const updateUser = async (user: User): Promise<User> => {
  try {
    const response = await axios.put<UserResponse>(
      `${API_BASE_URL}/users/${user.id}`,
      user
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
