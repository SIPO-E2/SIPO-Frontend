import axios from 'axios';
import { Pipeline, PipelineUpdate, PipelineCreation } from '../types';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

type PipelineResponseArray = {
   status: string;
   data: Pipeline[];
   message: string;
}

type PipelineResponse = {
   status: string;
   data: Pipeline;
   message: string;
}

export const getPipelines = async (): Promise<Pipeline[]> => {
 try {
    const response = await axios.get<PipelineResponseArray>(`${API_BASE_URL}/pipelines`);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al obtener los pipelines');
 }
};

export const getPipeline = async (id: string): Promise<PipelineResponse> => {
 try {
     const response = await axios.get<PipelineResponse>(`${API_BASE_URL}/pipelines/${id}`);
     return response.data;
 } catch (error) {
     throw new Error('Pipeline no encontrado');
 }
};

export const createPipeline = async (pipelineData: PipelineCreation): Promise<Pipeline> => {
 try {
    const response = await axios.post<PipelineResponse>(`${API_BASE_URL}/pipelines`, pipelineData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al crear el Pipeline');
 }
};

export const updatePipeline = async (id: string, pipelineData: PipelineUpdate): Promise<Pipeline> => {
 try {
    const response = await axios.put<PipelineResponse>(`${API_BASE_URL}/pipelines/${id}`, pipelineData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error al actualizar el Pipeline');
 }
};

export const deletePipeline = async (id: string): Promise<void> => {
 try {
    await axios.delete(`${API_BASE_URL}/pipelines/${id}`);
 } catch (error) {
    throw new Error('Error al eliminar el Pipeline');
 }
};
