import { create } from 'zustand';
import { candidateAPI, jobPositionAPI, allocationAPI, personAPI, interviewAPI, clientAPI } from '../api';

const { getCandidates } = candidateAPI;
const { getAllJobPositions } = jobPositionAPI;
const { getAllocations } = allocationAPI;
const { getAllPersons } = personAPI;
const { getAllInterviews } = interviewAPI;
const { getAllClients } = clientAPI;

type apiStore = {
  jobPositions: JobPosition[];
  candidates: Candidate[];
  allocations: Allocation[];
  persons: Person[];
  interviews: Interview[];
  clients: Client[];
  setJobPositions: (jobPositions: JobPosition[]) => void;
  setCandidates: (candidates: Candidate[]) => void;
  setAllocations: (allocations: Allocation[]) => void;
  setAllPersons: (persons: Person[]) => void;
  setAllInterviews: (interviews: Interview[]) => void;
  setClients: (clients: Client[]) => void;
  fetchJobPositions: () => Promise<void>;
  fetchCandidates: () => Promise<void>;
  fetchAllocations: () => Promise<void>;
  fetchPersons: () => Promise<void>;
  fetchInterviews: () => Promise<void>;
  fetchClients: () => Promise<void>;
};

export const useApisStore = create<apiStore>((set) => ({
  jobPositions: [],
  candidates: [],
  allocations: [],
  persons: [],
  interviews: [],
  clients: [],
  setJobPositions: (jobPositions) => set(() => ({ jobPositions })),
  setCandidates: (candidates) => set(() => ({ candidates })),
  setAllocations: (allocations) => set(() => ({ allocations })),
  setAllPersons: (persons) => set(() => ({ persons })),
  setAllInterviews: (interviews) => set(() => ({ interviews })),
  setClients: (clients) => set(() => ({ clients })),
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
  fetchInterviews: async () => {
    const interviews = await getAllInterviews();
    set(() => ({ interviews }));
  },
  fetchClients: async () => {
    const clients = await getAllClients();
    set(() => ({ clients }));
  }
}));
