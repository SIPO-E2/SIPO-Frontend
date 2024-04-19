// store/apisStore.ts

import {create} from 'zustand';
import { candidateAPI, jobPositionAPI } from '../api';
const { getCandidates } = candidateAPI;
const { getAllJobPositions } = jobPositionAPI;

type apiStore = {
 jobPositions: any[];
 candidates: any[];
 setJobPositions: (jobPositions: any[]) => void;
 setCandidates: (candidates: any[]) => void;
 fetchJobPositions: () => Promise<void>;
 fetchCandidates: () => Promise<void>;
};

export const useApisStore = create<apiStore>((set) => ({
 jobPositions: [],
 candidates: [],
 setJobPositions: (jobPositions) => set(() => ({ jobPositions })),
 setCandidates: (candidates) => set(() => ({ candidates })),
 fetchJobPositions: async () => {
    const jobPositions = await getAllJobPositions();
    set(() => ({ jobPositions }));
 },
 fetchCandidates: async () => {
    const candidates = await getCandidates();
    set(() => ({ candidates }));
 },
}));
