import {Project} from "../types/globals";
import api from ".";


export const getAllProjects = async () => {
  try {

    const res = await api.get(`/project`);
    const projects: Project[] = await res.data.payload;
    return projects;

  } 
  
  catch (err) {
    console.log(err);

  }
};


export const getProjectById = async (id: number) => {
  try {

    const res = await api.get(`/project/${id}`);
    const project: Project = await res.data.payload;
    return project;

  } 

  catch (err) {
    console.log(err);

  }
};

export const createProject = async (project: Project) => {
  try {

    const res = await api.post(`/project`, project);
    const action = await res.data.payload;
    return action;

  } 

  catch (err) {
    console.log(err);

  }
};


export const modifyProject = async (id: number, tproject: Project) => {
  try {

    const res = await api.patch(`/project/${id}`, { data: tproject });
    const project: Project = await res.data.payload;
    return project;

  } 
  
  catch (err) {
    console.log(err);
  }
};

export const deleteProject = async (id: number) => {
  try {

    const res = await api.delete("/project", { data: { id } });
    const action = await res.data.payload;
    return action;
  } 
  
  catch (err) {
    console.log(err);
  }
};



/*
import axios from 'axios';

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

*/