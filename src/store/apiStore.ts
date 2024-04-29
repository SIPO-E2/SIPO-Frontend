//store/apisStore.ts

import {create} from 'zustand';
import { JobPosition, Candidate, Project, Opening, Person, Pipeline, Bench, Billing } from '../types';
import { candidateAPI, jobPositionAPI, openingAPI, personAPI, projectAPI, pipelineAPI, benchAPI, billingAPI} from '../api';
const { getCandidates } = candidateAPI;
const { getAllJobPositions } = jobPositionAPI;
const { getProjects, deleteProject }= projectAPI;
const { getOpenings } = openingAPI;

const {getPersons} = personAPI;
const {getPipelines} = pipelineAPI;
const {getBenches} = benchAPI;
const {getBillings} = billingAPI;


type apiStore = {
    jobPositions: JobPosition[];
    candidates: Candidate[];
    projects: Project[];
    openings: Opening[];
    persons: Person[];
    pipelines: Pipeline[];
    benches: Bench[];
    billings: Billing[];

    setJobPositions: (jobPositions: JobPosition[]) => void;
    setCandidates: (candidates: Candidate[]) => void;
 setProjects: (projects: Project[]) => void;
 setOpenings: (openings: Opening[]) => void;
    setPersons: (persons: Person[]) => void;
    setPipelines: (pipelines: Pipeline[]) => void;
    setBenches: (benches: Bench[]) => void;
    setBillings: (billings: Billing[]) => void;

    fetchJobPositions: () => Promise<void>;
    fetchCandidates: () => Promise<void>;
 fetchOpenings: () => Promise<void>;
fetchProjects: () => Promise<void>;
    fetchPersons: () => Promise<void>;
    fetchPipelines: () => Promise<void>;
    fetchBenches: () => Promise<void>;
    fetchBillings: () => Promise<void>;
};

export const useApisStore = create<apiStore>((set) => ({
    jobPositions: [],
    candidates: [],
 projects: [],
 openings: [],
    persons: [],
    pipelines: [],
    benches: [],
    billings: [],

    setJobPositions: (jobPositions) => set(() => ({ jobPositions })),
    setCandidates: (candidates) => set(() => ({ candidates })),
 setProjects: (projects) => set(() => ({ projects })),
 setOpenings: (openings) => set(() => ({openings})),

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
 fetchProjects: async () => {
   const projects = await getProjects(0,10);
   console.log(projects);
   
   set(() => ({ projects }));
},

 fetchOpenings: async () => {
   const openings = await getOpenings();
   set(() => ({openings}));
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