// store/apisStore.ts

import { create } from 'zustand';
import { candidateAPI, jobPositionAPI, allocationAPI , personAPI} from '../api'; // Import allocationAPI
const { getCandidates } = candidateAPI;
const { getAllJobPositions } = jobPositionAPI;
const { getAllocations } = allocationAPI; // Import getAllocations from allocationAPI
const {getAllPersons} = personAPI;

type apiStore = {
  jobPositions: JobPosition[];
  candidates: Candidate[];
  allocations: Allocation[]; // Define allocations array
  persons: Person[];
  setJobPositions: (jobPositions: JobPosition[]) => void;
  setCandidates: (candidates: Candidate[]) => void;
  setAllocations: (allocations: Allocation[]) => void; // Define setAllocations function
  setAllPersons: (persons: Person[]) => void;
  fetchJobPositions: () => Promise<void>;
  fetchCandidates: () => Promise<void>;
  fetchAllocations: () => Promise<void>; // Define fetchAllocations function
  fetchPersons: () => Promise<void>;
};

export const useApisStore = create<apiStore>((set) => ({
  jobPositions: [],
  candidates: [],
  allocations: [],
  persons: [],
  setJobPositions: (jobPositions) => set(() => ({ jobPositions })),
  setCandidates: (candidates) => set(() => ({ candidates })),
  setAllocations: (allocations) => set(() => ({ allocations })), // Define setAllocations function
  setAllPersons: (persons) => set (() => ({persons})),
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
  },
  fetchPersons: async () => {
    const persons = await getAllPersons();
    set(() => ({ persons }));
  },
}));
