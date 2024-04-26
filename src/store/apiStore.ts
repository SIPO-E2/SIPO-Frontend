//store/apisStore.ts

import {create} from 'zustand';
import { candidateAPI, jobPositionAPI, personAPI, pipelineAPI, benchAPI, billingAPI} from '../api';
import { Bench, Billing, Candidate, JobPosition, Person, Pipeline } from '../types/globals';

const { getCandidates } = candidateAPI;
const { getAllJobPositions } = jobPositionAPI;
const {getPersons} = personAPI;
const {getPipelines} = pipelineAPI;
const {getBenches} = benchAPI;
const {getBillings} = billingAPI;
const {postPerson} = personAPI;
const {postCandidate} = candidateAPI;
const {postPipeline} = pipelineAPI;
const {postBench} = benchAPI;
const {postBilling} = billingAPI;
const {updatePipeline} = pipelineAPI;


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
    postPerson: (personData: any) => Promise<Person>;
    postCandidate: (candidateData: any) => Promise<Candidate>;
    postPipeline: (pipelineData: any) => Promise<Pipeline>;
    postBench: (benchData: any) => Promise<Bench>;
    postBilling: (billingData: any) => Promise<Billing>;

    updatePipeline: (id: string, pipelineData: any) => Promise<Pipeline>;
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
    postPerson: async (personData): Promise<Person> => {
        const newPerson = await postPerson(personData);
        set((state) => ({ persons: [...state.persons, newPerson] }));
        return newPerson;
    },
    postCandidate: async (candidateData): Promise<Candidate> => {
        const newCandidate = await postCandidate(candidateData);
        set((state) => ({ candidates: [...state.candidates, newCandidate] }));
        return newCandidate;
    },
    postPipeline: async (pipelineData): Promise<Pipeline> => {
        const newPipeline = await postPipeline(pipelineData);
        set((state) => ({ pipelines: [...state.pipelines, newPipeline] }));
        return newPipeline;
    },
    postBench: async (benchData): Promise<Bench> => {
        const newBench = await postBench(benchData);
        set((state) => ({ benches: [...state.benches, newBench] }));
        return newBench;
    },
    postBilling: async (billingData): Promise<Billing> => {
        const newBilling = await postBilling(billingData);
        set((state) => ({ billings: [...state.billings, newBilling] }));
        return newBilling;
    },
    updatePipeline: async (id, pipelineData): Promise<Pipeline> => {
        const updatedPipeline = await updatePipeline(id, pipelineData);
        set((state) => ({
            pipelines: state.pipelines.map((pipeline) =>
                pipeline.id.toString() === id ? updatedPipeline : pipeline
            ),
        }));
        return updatedPipeline;
    },
}));

export { postPerson, postCandidate, postPipeline, postBilling, updatePipeline, type apiStore };
