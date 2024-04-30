import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

type InterviewResponseArray = {
   status: string;
   data: Interview[];
   message: string;
}

type InterviewResponse = {
   status: string;
   data: Interview;
   message: string;
}

export enum InterviewStatus {
    Scheduled = "Scheduled",
    Approved = "Approved",
    Rejected = "Rejected"
}

export const getAllInterviews = async (): Promise<Interview[]> => {
 try {
    const response = await axios.get<InterviewResponseArray>(`${API_BASE_URL}/interviews`);
    return response.data.data;
 } catch (error) {
    throw new Error('Error fetching interviews');
 }
};

export const getInterview = async (id: string): Promise<Interview> => {
 try {
    const response = await axios.get<InterviewResponse>(`${API_BASE_URL}/interviews/${id}`);
    return response.data.data;
 } catch (error) {
    throw new Error('Interview not found');
 }
};

export const createInterview = async (interviewData: InterviewCreationAttributes): Promise<Interview> => {
 try {
    const response = await axios.post<InterviewResponse>(`${API_BASE_URL}/interviews`, interviewData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error creating interview');
 }
};

export const updateInterview = async (id: string, interviewData: InterviewCreationAttributes): Promise<Interview> => {
 try {
    const response = await axios.patch<InterviewResponse>(`${API_BASE_URL}/interviews/${id}`, interviewData);
    return response.data.data;
 } catch (error) {
    throw new Error('Error updating interview');
 }
};

export const updateInterviewStatus = async (id: string, newStatus: InterviewStatus): Promise<void> => {
   try {
      const response = await axios.patch(`${API_BASE_URL}/interviews/${id}`, { status: newStatus });
      console.log(response.data);
   } catch (error) {
      throw new Error('Error updating interview status');
   }
};

export const updateInterviewDate = async (id: string, new_status_date: Date): Promise<void> => {
    try {
       const response = await axios.patch(`${API_BASE_URL}/interviews/${id}`, { status_date: new_status_date });
       console.log(response.data);
    } catch (error) {
       throw new Error('Error updating interview date');
    }
 };

export const deleteInterview = async (id: string): Promise<void> => {
 try {
    await axios.delete(`${API_BASE_URL}/interviews/${id}`);
 } catch (error) {
    throw new Error('Error deleting interview');
 }
};
