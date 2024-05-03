import axios from 'axios';
import { Interview, InterviewCreation, InterviewUpdate, InterviewResponse, InterviewResponseArray } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;


export const getInterviews = async (from = 0, to = 7): Promise<Interview[]> => {
   try {
      const response = await axios.get<InterviewResponseArray>(`${API_BASE_URL}/interviews?from=${from}&to=${to}`);
      return response.data.data;
   } catch (error) {
      throw new Error('Error obtaining all interviews');
   }
};

export const getInterviewById = async (id: number): Promise<Interview> => {
   try {
      const response = await axios.get<InterviewResponse>(`${API_BASE_URL}/interviews/${id}`);
      return response.data.data;
   } catch (error) {
      throw new Error('Interview not found');
   }
};

export const createInterview = async (interviewData: InterviewCreation): Promise<Interview> => {
   try {
      const response = await axios.post<InterviewResponse>(`${API_BASE_URL}/interviews`, interviewData);
      return response.data.data;
   } catch (error) {
      throw new Error('Error creating interview');
   }
};

export const updateInterview = async (id: number, interviewData: InterviewUpdate): Promise<Interview> => {
   try {
      const response = await axios.patch<InterviewResponse>(`${API_BASE_URL}/interviews/${id}`, interviewData);
      return response.data.data;
   } catch (error) {
      throw new Error('Error updating interview');
   }
};

export const deleteInterview = async (id: number): Promise<void> => {
   try {
      await axios.delete(`${API_BASE_URL}/interviews/${id}`);
   } catch (error) {
      throw new Error('Error deleting interview');
   }
};