import Axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

type RoleResponseArray = {
  status: string;
  data: Role[];
  message: string;
};

type RoleResponse = {
  status: string;
  data: Role;
  message: string;
};

export const getRoles = async (
  page: number,
  limit: number,
  name: string,
  updatedStart: string,
  updatedEnd: string
) => {
  try {
    const response = await Axios.get<RoleResponseArray>(
      `${API_BASE_URL}/roles`,
      {
        params: {
          page,
          limit,
          name,
          updatedStart,
          updatedEnd,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching roles", error);
    throw new Error("Error fetching roles");
  }
};

export const getRoleById = async (id: number): Promise<Role> => {
  try {
    const response = await Axios.get<RoleResponse>(
      `${API_BASE_URL}/roles/${id}`
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error fetching role by id");
  }
};

export const createRole = async (role: Role): Promise<Role> => {
  try {
    const response = await Axios.post<RoleResponse>(
      `${API_BASE_URL}/roles`,
      role
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error creating role");
  }
};

export const updateRole = async (role: Role): Promise<Role> => {
  try {
    const response = await Axios.put<RoleResponse>(
      `${API_BASE_URL}/roles/${role.id}`,
      role
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error updating role");
  }
};

export const deleteRole = async (id: number): Promise<void> => {
  try {
    await Axios.delete(`${API_BASE_URL}/roles/${id}`);
  } catch (error) {
    throw new Error("Error deleting role");
  }
};
