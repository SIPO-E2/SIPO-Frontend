import axios from 'axios';
import { Pipeline, PipelineCreation, PipelineUpdate, PipelineResponse, PipelineResponseArray } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;


export const getPipeline = async (from = 0, to = 7): Promise<Pipeline[]> => {
   try {
      const response = await axios.get<PipelineResponseArray>(`${API_BASE_URL}/pipelines?from=${from}&to=${to}`);
      return response.data.data.filter((pipeline) => pipeline.activeDB === true);
   } catch (error) {
      throw new Error('Error obtaining all pipelines');
   }
};

export const getPipelineById = async (id: number): Promise<Pipeline> => {
   try {
      const response = await axios.get<PipelineResponse>(`${API_BASE_URL}/pipelines/${id}`);
      return response.data.data;
   } catch (error) {
      throw new Error('Pipeline not found');
   }
};

export const createPipeline = async (pipelinedata: PipelineCreation): Promise<Pipeline> => {
   try {
      const response = await axios.post<PipelineResponse>(`${API_BASE_URL}/pipelines`, pipelinedata);
      return response.data.data;
   } catch (error) {
      throw new Error('Error creating pipeline');
   }
};

export const updatePipeline = async (id: number, pipelineData: PipelineUpdate): Promise<Pipeline> => {
   try {
      const response = await axios.patch<PipelineResponse>(`${API_BASE_URL}/pipelines/${id}`, pipelineData);
      return response.data.data;
   } catch (error) {
      throw new Error('Error updating pipeline');
   }
};

export const deletePipeline = async (id: number): Promise<void> => {
   try {
      await axios.delete(`${API_BASE_URL}/pipelines/${id}`);
   } catch (error) {
      throw new Error('Error deleting pipeline');
   }
};
