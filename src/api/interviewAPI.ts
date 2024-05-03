import axios from 'axios';
import { Interview, InterviewCreation, InterviewStatus, InterviewUpdate, InterviewResponse, InterviewResponseArray} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const getAllInterviews = async (): Promise<Interview[]> => {
 try {
    const response = await axios.get<InterviewResponseArray>(`${API_BASE_URL}/interviews`);
    return response.data.data;
 } catch (error) {
    throw new Error('Error fetching interviews');
 }
};

export const getInterview = async (id: number): Promise<Interview> => {
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

export const updateInterviewStatus = async (id: number, newStatus: InterviewStatus): Promise<void> => {
   try {
      const response = await axios.patch(`${API_BASE_URL}/interviews/${id}`, { status: newStatus });
      console.log(response.data);
   } catch (error) {
      throw new Error('Error updating interview status');
   }
};

export const updateInterviewReasonStatus = async (id: number, newReasonStatus: string): Promise<void> => {
    try {
       const response = await axios.patch(`${API_BASE_URL}/interviews/${id}`, { reason_current_status: newReasonStatus });
       console.log(response.data);
    } catch (error) {
       throw new Error('Error updating interview reason status');
    }
 };

export const updateInterviewDate = async (id: number, new_status_date: Date): Promise<void> => {
    try {
       const response = await axios.patch(`${API_BASE_URL}/interviews/${id}`, { status_date: new_status_date });
       console.log(response.data);
    } catch (error) {
       throw new Error('Error updating interview date');
    }
 };

export const deleteInterview = async (id: number): Promise<void> => {
 try {
    await axios.delete(`${API_BASE_URL}/interviews/${id}`);
 } catch (error) {
    throw new Error('Error deleting interview');
 }
};
