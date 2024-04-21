//store/apisStore.ts

import {create} from 'zustand';
import { candidateAPI, jobPositionAPI, projectAPI } from '../api';
const { getCandidates } = candidateAPI;
const { getAllJobPositions } = jobPositionAPI;
const { getProjects }= projectAPI;

type apiStore = {
 jobPositions: JobPosition[];
 candidates: Candidate[];
 projects: Project[];
 setJobPositions: (jobPositions: JobPosition[]) => void;
 setCandidates: (candidates: Candidate[]) => void;
 setProjects: (projects: Project[]) => void;
 fetchJobPositions: () => Promise<void>;
 fetchCandidates: () => Promise<void>;
};

export const useApisStore = create<apiStore>((set) => ({
 jobPositions: [],
 candidates: [],
 projects: [],
 setJobPositions: (jobPositions) => set(() => ({ jobPositions })),
 setCandidates: (candidates) => set(() => ({ candidates })),
 setProjects: (projects) => set(() => ({ projects })),

 fetchJobPositions: async () => {
    const jobPositions = await getAllJobPositions();
    set(() => ({ jobPositions }));
 },
 fetchCandidates: async () => {
    const candidates = await getCandidates();
    set(() => ({ candidates }));
 },
 fetchProjects: async () => {
   const projects = await getProjects();
   set(() => ({ projects }));
},
}));
