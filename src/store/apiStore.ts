//store/apisStore.ts

import {create} from 'zustand';
import { candidateAPI, jobPositionAPI, projectAPI, openingAPI} from '../api';
import { JobPosition, Candidate, Project, Opening } from '../types';
const { getCandidates } = candidateAPI;
const { getAllJobPositions } = jobPositionAPI;
const { getProjects, deleteProject }= projectAPI;
const { getOpenings } = openingAPI;


type apiStore = {
 jobPositions: JobPosition[];
 candidates: Candidate[];
 projects: Project[];
 openings: Opening[];
 setJobPositions: (jobPositions: JobPosition[]) => void;
 setCandidates: (candidates: Candidate[]) => void;
 setProjects: (projects: Project[]) => void;
 setOpenings: (openings: Opening[]) => void;
 fetchJobPositions: () => Promise<void>;
 fetchCandidates: () => Promise<void>;
 fetchOpenings: () => Promise<void>;
fetchProjects: () => Promise<void>;
};

export const useApisStore = create<apiStore>((set) => ({
 jobPositions: [],
 candidates: [],
 projects: [],
 openings: [],
 setJobPositions: (jobPositions) => set(() => ({ jobPositions })),
 setCandidates: (candidates) => set(() => ({ candidates })),
 setProjects: (projects) => set(() => ({ projects })),
 setOpenings: (openings) => set(() => ({openings})),

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

 fetchOpenings: async () => {
   const openings = await getOpenings();
   set(() => ({openings}));
 },


}));
