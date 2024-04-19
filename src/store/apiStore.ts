// store/apisStore.ts

import {create} from 'zustand';
import { candidateAPI, jobPositionAPI, BenchAPI, BillingAPI, PersonAPI, PipelineAPI } from '../api';
const { getCandidates } = candidateAPI;
const { getAllJobPositions } = jobPositionAPI;
const {getPipelines} = PipelineAPI;
const {getBenches} = BenchAPI;
const {getBillings} = BillingAPI;
const {getPersons} = PersonAPI;


type apiStore = {
    jobPositions: JobPosition[];
    candidates: Candidate[];
    pipelines: Pipeline[];
    benches: Bench[];
    billings: Billing[];    
    persons: Person[];

    setJobPositions: (jobPositions: JobPosition[]) => void;
    setCandidates: (candidates: Candidate[]) => void;
    setPipelines: (pipelines: Pipeline[]) => void;
    setBenches: (benches: Bench[]) => void;
    setBillings: (billings: Billing[]) => void;
    setPersons: (persons: Person[]) => void;

    fetchJobPositions: () => Promise<void>;
    fetchCandidates: () => Promise<void>;
    fetchPipelines: () => Promise<void>;
    fetchBenches: () => Promise<void>;
    fetchBillings: () => Promise<void>;
    fetchPersons: () => Promise<void>;
};

export const useApisStore = create<apiStore>((set) => ({
    jobPositions: [],
    candidates: [],
    pipelines: [],
    benches: [],
    billings: [],
    persons: [],

    setJobPositions: (jobPositions) => set(() => ({ jobPositions })),
    setCandidates: (candidates) => set(() => ({ candidates })),
    setPipelines: (pipelines) => set(() => ({ pipelines })),
    setBenches: (benches) => set(() => ({ benches })),
    setBillings: (billings) => set(() => ({ billings })),
    setPersons: (persons) => set(() => ({ persons })),

    fetchJobPositions: async () => {
        const jobPositions = await getAllJobPositions();
        set(() => ({ jobPositions }));
    },
    fetchCandidates: async () => {
        const candidates = await getCandidates();
        set(() => ({ candidates }));
    },

    fetchPipelines: async () => {
        const pipelines = await getPipelines();
        set(() => ({ pipelines }));
    },

    fetchBenches: async () => {
        const benches = await getBenches();
        set(() => ({ benches }));
    },

    fetchBillings: async () => {
        const billings = await getBillings();
        set(() => ({ billings }));
    },

    fetchPersons: async () => {
        const persons = await getPersons();
        set(() => ({ persons }));
    },
}));
