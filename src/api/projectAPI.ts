import axios from 'axios';
import { Project, ProjectCreationAttributes } from '../types/globals';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

type ProjectResponseArray = {
    status: string;
    data: Project[];
    message: string;
 };

type ProjectResponse = {
    status: string;
    data: Project;
    message: string;
 };

export const getProject = async (): Promise<Project[]> => {
try {
  const response = await axios.get<ProjectResponseArray>(`${API_BASE_URL}/project`);
  return response.data.data;
} catch (error) {
  throw new Error('Error al obtener los proyectos');
}
};

export const getProjectById = async (id: string): Promise<Project> => {
try {
  const response = await axios.get<ProjectResponse>(`${API_BASE_URL}/projects/${id}`);
  return response.data.data;
} catch (error) {
  throw new Error('Proyecto no encontrado');
}
};

export const createProject = async (projectData: ProjectCreationAttributes): Promise<Project> => {
try {
  const response = await axios.post<ProjectResponse>(`${API_BASE_URL}/projects`, projectData);
  return response.data.data;
} catch (error) {
  throw new Error('Error al crear el proyecto');
}
};

export const updateProject = async (id: string, projectData: ProjectCreationAttributes): Promise<Project> => {
try {
  const response = await axios.put<ProjectResponse>(`${API_BASE_URL}/projects/${id}`, projectData);
  return response.data.data;
} catch (error) {
  throw new Error('Error al actualizar proyecto');
}
};

export const deleteProject = async (id: string): Promise<void> => {
try {
  await axios.delete(`${API_BASE_URL}/projects/${id}`);
} catch (error) {
  throw new Error('Error al eliminar el proyecto');
}
};
