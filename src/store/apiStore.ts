//store/apisStore.ts

import { create } from 'zustand';
// import { JobPosition, Candidate, Project, Opening, Person, Pipeline, Bench, Billing, PersonResponse } from '../types';
// import { candidateAPI, jobPositionAPI, openingAPI, personAPI, projectAPI, pipelineAPI, benchAPI, billingAPI } from '../api';
// const { getCandidates } = candidateAPI;
// const { getAllJobPositions } = jobPositionAPI;
// const { getProjects, deleteProject } = projectAPI;
import { JobPosition, Candidate, Project, Opening, Person, Pipeline, Bench, Billing, Allocation, Interview, Client } from '../types';
import { candidateAPI, jobPositionAPI, openingAPI, personAPI, projectAPI, pipelineAPI, benchAPI, billingAPI, allocationAPI, interviewAPI, clientAPI } from '../api';
const { getClients } = clientAPI;
const { getCandidates } = candidateAPI;
const { getAllJobPositions } = jobPositionAPI;
const { getProjects } = projectAPI;
const { getOpenings } = openingAPI;
const { getPersons } = personAPI;
const { getPipelines } = pipelineAPI;
const { getBenches } = benchAPI;
const { getBillings } = billingAPI;
const { getAllocations } = allocationAPI;
const { getAllInterviews } = interviewAPI;
const { postPerson } = personAPI;
const { postCandidate } = candidateAPI;
const { createPipeline } = pipelineAPI;
const { postBench } = benchAPI;
const { postBilling } = billingAPI;
const { updatePipeline } = pipelineAPI;
const { updateBilling } = billingAPI;
const { updateBench } = benchAPI;


type apiStore = {
  clients: Client[];
  jobPositions: JobPosition[];
  candidates: Candidate[];
  projects: Project[];
  openings: Opening[];
  persons: Person[];
  pipelines: Pipeline[];
  benches: Bench[];
  billings: Billing[];
  interviews: Interview[];
  allocations: Allocation[];

  setClients: (clients: Client[]) => void;
  setAllocations: (allocations: Allocation[]) => void;
  setAllInterviews: (interviews: Interview[]) => void;
  setJobPositions: (jobPositions: JobPosition[]) => void;
  setCandidates: (candidates: Candidate[]) => void;
  setProjects: (projects: Project[]) => void;
  setOpenings: (openings: Opening[]) => void;
  setPersons: (persons: Person[]) => void;
  setPipelines: (pipelines: Pipeline[]) => void;
  setBenches: (benches: Bench[]) => void;
  setBillings: (billings: Billing[]) => void;

  fetchClients: () => Promise<void>;
  fetchInterviews: () => Promise<void>;
  fetchAllocations: () => Promise<void>;
  fetchJobPositions: () => Promise<void>;
  fetchCandidates: () => Promise<void>;
  fetchOpenings: () => Promise<void>;
  fetchProjects: () => Promise<void>;
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
   updateBilling: (id: string, billingData: any) => Promise<Billing>;
   updateBench: (id: string, benchData: any) => Promise<Bench>;



};

export const useApisStore = create<apiStore>((set) => ({
  clients: [],
  jobPositions: [],
  candidates: [],
  projects: [],
  openings: [],
  persons: [],
  pipelines: [],
  benches: [],
  billings: [],
  interviews: [],
  allocations: [],

  setClients: (clients) => set(() => ({ clients })),
  setAllocations: (allocations) => set(() => ({ allocations })),
  setAllInterviews: (interviews) => set(() => ({ interviews })),
  setJobPositions: (jobPositions) => set(() => ({ jobPositions })),
  setCandidates: (candidates) => set(() => ({ candidates })),
  setProjects: (projects) => set(() => ({ projects })),
  setOpenings: (openings) => set(() => ({ openings })),
  setPersons: (persons) => set(() => ({ persons })),
  setPipelines: (pipelines) => set(() => ({ pipelines })),
  setBenches: (benches) => set(() => ({ benches })),
  setBillings: (billings) => set(() => ({ billings })),

  fetchClients: async () => {
    const clients = await getClients();
    set(() => ({ clients }));
  },
  fetchInterviews: async () => {
    const interviews = await getAllInterviews();
    set(() => ({ interviews }));
  },
  fetchAllocations: async () => {
    const allocations = await getAllocations();
    set(() => ({ allocations }));
  },
  fetchJobPositions: async () => {
    const jobPositions = await getAllJobPositions();
    set(() => ({ jobPositions }));
  },
  fetchCandidates: async () => {
    const candidates = await getCandidates();
    set(() => ({ candidates }));
  },
  fetchProjects: async () => {
    const projects = await getProjects(0, 10);
    console.log(projects);

    set(() => ({ projects }));
  },
  fetchOpenings: async () => {
    const openings = await getOpenings();
    set(() => ({ openings }));
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
   const newPipeline = await createPipeline(pipelineData);
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
   const updatedPipeline = await updatePipeline(parseInt(id), pipelineData);
   set((state) => ({
      pipelines: state.pipelines.map((pipeline) =>
          pipeline.id.toString() === id ? updatedPipeline : pipeline
      ),
   }));
   return updatedPipeline;
   },
   updateBilling: async (id, billingData): Promise<Billing> => {
   const updatedBilling = await updateBilling(id, billingData);
   set((state) => ({
      billings: state.billings.map((billing) =>
          billing.id.toString() === id ? updatedBilling : billing
      ),
   }));
   return updatedBilling;
   },
   updateBench: async (id, benchData): Promise<Bench> => {
   const updatedBench = await updateBench(id, benchData);
   set((state) => ({
      benches: state.benches.map((bench) =>
          bench.id.toString() === id ? updatedBench : bench
      ),
   }));
   return updatedBench;
   },
}));

