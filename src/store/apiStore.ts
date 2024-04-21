//store/apisStore.ts

import {create} from 'zustand';
import { candidateAPI, jobPositionAPI, personAPI, pipelineAPI, benchAPI, billingAPI} from '../api';
const { getCandidates } = candidateAPI;
const { getAllJobPositions } = jobPositionAPI;
const {getPersons} = personAPI;
const {getPipelines} = pipelineAPI;
const {getBenches} = benchAPI;
const {getBillings} = billingAPI;


type apiStore = {
    jobPositions: JobPosition[];
    candidates: Candidate[];
    persons: Person[];
    pipelines: Pipeline[];
    benches: Bench[];
    billings: Billing[];

    setJobPositions: (jobPositions: JobPosition[]) => void;
    setCandidates: (candidates: Candidate[]) => void;
    setPersons: (persons: Person[]) => void;
    setPipelines: (pipelines: Pipeline[]) => void;
    setBenches: (benches: Bench[]) => void;
    setBillings: (billings: Billing[]) => void;

    fetchJobPositions: () => Promise<void>;
    fetchCandidates: () => Promise<void>;
    fetchPersons: () => Promise<void>;
    fetchPipelines: () => Promise<void>;
    fetchBenches: () => Promise<void>;
    fetchBillings: () => Promise<void>;
};

export const useApisStore = create<apiStore>((set) => ({
    jobPositions: [],
    candidates: [],
    persons: [],
    pipelines: [],
    benches: [],
    billings: [],

    setJobPositions: (jobPositions) => set(() => ({ jobPositions })),
    setCandidates: (candidates) => set(() => ({ candidates })),
    setPersons: (persons) => set(() => ({ persons })),
    setPipelines: (pipelines) => set(() => ({ pipelines })),
    setBenches: (benches) => set(() => ({ benches })),
    setBillings: (billings) => set(() => ({ billings })),

    fetchJobPositions: async () => {
        const jobPositions = await getAllJobPositions();
        set(() => ({ jobPositions }));
    },
    fetchCandidates: async () => {
        const candidates = await getCandidates();
        set(() => ({ candidates }));
    },
    fetchPersons: async () => {
        const persons = await getPersons();
        set(() => ({ persons }));
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
}));