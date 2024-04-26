import axios from 'axios';
import { Project, ProjectCreation, ProjectUpdate, ProjectResponse, ProjectResponseArray } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;


export const getProjects = async (): Promise<Project[]> => {
try {
  const response = await axios.get<ProjectResponseArray>(`${API_BASE_URL}/projects`);
  return response.data.data;
} catch (error) {
  throw new Error('Error al obtener los proyectos');
}
};

export const getProjectById = async (id: number): Promise<Project> => {
try {
  const response = await axios.get<ProjectResponse>(`${API_BASE_URL}/projects/${id}`);
  return response.data.data;
} catch (error) {
  throw new Error('Proyecto no encontrado');
}
};

export const createProject = async (projectData: ProjectCreation): Promise<Project> => {
try {
  const response = await axios.post<ProjectResponse>(`${API_BASE_URL}/projects`, projectData);
  return response.data.data;
} catch (error) {
  throw new Error('Error al crear el proyecto');
}
};

export const updateProject = async (id: number, projectData: ProjectUpdate): Promise<Project> => {
try {
  const response = await axios.put<ProjectResponse>(`${API_BASE_URL}/projects/${id}`, projectData);
  return response.data.data;
} catch (error) {
  throw new Error('Error al actualizar proyecto');
}
};

export const deleteProject = async (id: number): Promise<void> => {
try {
  await axios.delete(`${API_BASE_URL}/projects/${id}`);
} catch (error) {
  throw new Error('Error al eliminar el proyecto');
}
};

