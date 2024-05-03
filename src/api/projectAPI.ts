import axios from 'axios';
import { Project, ProjectCreation, ProjectUpdate, ProjectResponse, ProjectResponseArray } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;


export const getProjects = async (from = 0, to = 7): Promise<Project[]> => {
    try {
        const response = await axios.get<ProjectResponseArray>(`${API_BASE_URL}/projects?from=${from}&to=${to}`);
        return response.data.data.filter((project) => project.activeDB === true);
    } catch (error) {
        throw new Error('Error obtaining all projects');
    }
};

export const getProjectById = async (id: number): Promise<Project> => {
    try {
        const response = await axios.get<ProjectResponse>(`${API_BASE_URL}/projects/${id}`);
        return response.data.data;
    } catch (error) {
        throw new Error('Project not found');
    }
};

export const createProject = async (projectData: ProjectCreation): Promise<Project> => {
    try {
        const response = await axios.post<ProjectResponse>(`${API_BASE_URL}/projects`, projectData);
        return response.data.data;
    } catch (error) {
        throw new Error('Error creating project');
    }
};

export const updateProject = async (id: number, projectData: ProjectUpdate): Promise<Project> => {
    try {
        const response = await axios.patch<ProjectResponse>(`${API_BASE_URL}/projects/${id}`, projectData);
        return response.data.data;
    } catch (error) {
        throw new Error('Error updating project');
    }
};

export const deleteProject = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/projects/${id}`);
    } catch (error) {
        throw new Error('Error deleting project');
    }
};

