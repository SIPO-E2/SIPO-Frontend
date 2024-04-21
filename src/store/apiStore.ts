// store/apisStore.ts

import { create } from 'zustand';
import { candidateAPI, jobPositionAPI, allocationAPI } from '../api'; // Import allocationAPI
const { getCandidates } = candidateAPI;
const { getAllJobPositions } = jobPositionAPI;
const { getAllocations } = allocationAPI; // Import getAllocations from allocationAPI

type apiStore = {
  jobPositions: JobPosition[];
  candidates: Candidate[];
  allocations: Allocation[]; // Define allocations array
  setJobPositions: (jobPositions: JobPosition[]) => void;
  setCandidates: (candidates: Candidate[]) => void;
  setAllocations: (allocations: Allocation[]) => void; // Define setAllocations function
  fetchJobPositions: () => Promise<void>;
  fetchCandidates: () => Promise<void>;
  fetchAllocations: () => Promise<void>; // Define fetchAllocations function
};

export const useApisStore = create<apiStore>((set) => ({
  jobPositions: [],
  candidates: [],
  allocations: [], // Initialize allocations array
  setJobPositions: (jobPositions) => set(() => ({ jobPositions })),
  setCandidates: (candidates) => set(() => ({ candidates })),
  setAllocations: (allocations) => set(() => ({ allocations })), // Define setAllocations function
  fetchJobPositions: async () => {
    const jobPositions = await getAllJobPositions();
    set(() => ({ jobPositions }));
  },
  fetchCandidates: async () => {
    const candidates = await getCandidates();
    set(() => ({ candidates }));
  },
  fetchAllocations: async () => {
    const allocations = await getAllocations();
    set(() => ({ allocations }));
  }, // Define fetchAllocations method to fetch allocations
}));
