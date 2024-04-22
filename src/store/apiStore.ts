//store/apisStore.ts

import { create } from "zustand";
import {
  // candidateAPI,
  // jobPositionAPI,
  // personAPI,
  // pipelineAPI,
  // benchAPI,
  // billingAPI,
  clientAPI,
  projectAPI,
  roleAPI,
  userAPI,
  userRoleAPI,
} from "../api";
// const { getCandidates } = candidateAPI;
// const { getAllJobPositions } = jobPositionAPI;
// const { getPersons } = personAPI;
// const { getPipelines } = pipelineAPI;
// const { getBenches } = benchAPI;
// const { getBillings } = billingAPI;
const { getClients, updateClient } = clientAPI;
const { getProjects } = projectAPI;
const { getRoles } = roleAPI;
const { getUsers } = userAPI;
const { getUserRoles } = userRoleAPI;

type apiStore = {
  // jobPositions: JobPosition[];
  // candidates: Candidate[];
  // persons: Person[];
  // pipelines: Pipeline[];
  // benches: Bench[];
  // billings: Billing[];
  clients: Client[];
  projects: Project[];
  roles: Role[];
  users: User[];
  userRoles: UserRole[];

  // setJobPositions: (jobPositions: JobPosition[]) => void;
  // setCandidates: (candidates: Candidate[]) => void;
  // setPersons: (persons: Person[]) => void;
  // setPipelines: (pipelines: Pipeline[]) => void;
  // setBenches: (benches: Bench[]) => void;
  // setBillings: (billings: Billing[]) => void;
  setClients: (clients: Client[]) => void;
  setProjects: (projects: Project[]) => void;
  setRoles: (roles: Role[]) => void;
  setUsers: (users: User[]) => void;
  setUserRoles: (userRoles: UserRole[]) => void;

  updateClient: (client: Client) => Promise<void>;

  // fetchJobPositions: () => Promise<void>;
  // fetchCandidates: () => Promise<void>;
  // fetchPersons: () => Promise<void>;
  // fetchPipelines: () => Promise<void>;
  // fetchBenches: () => Promise<void>;
  // fetchBillings: () => Promise<void>;
  fetchClients: () => Promise<void>;
  fetchProjects: () => Promise<void>;
  fetchRoles: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  fetchUserRoles: () => Promise<void>;
};

export const useApisStore = create<apiStore>((set) => ({
  // jobPositions: [],
  // candidates: [],
  // persons: [],
  // pipelines: [],
  // benches: [],
  // billings: [],
  clients: [],
  projects: [],
  roles: [],
  users: [],
  userRoles: [],

  // setJobPositions: (jobPositions) => set(() => ({ jobPositions })),
  // setCandidates: (candidates) => set(() => ({ candidates })),
  // setPersons: (persons) => set(() => ({ persons })),
  // setPipelines: (pipelines) => set(() => ({ pipelines })),
  // setBenches: (benches) => set(() => ({ benches })),
  // setBillings: (billings) => set(() => ({ billings })),
  setClients: (clients) => set(() => ({ clients })),
  setProjects: (projects) => set(() => ({ projects })),
  setRoles: (roles) => set(() => ({ roles })),
  setUsers: (users) => set(() => ({ users })),
  setUserRoles: (userRoles) => set(() => ({ userRoles })),

  // fetchJobPositions: async () => {
  //   const jobPositions = await getAllJobPositions();
  //   set(() => ({ jobPositions }));
  // },
  // fetchCandidates: async () => {
  //   const candidates = await getCandidates();
  //   set(() => ({ candidates }));
  // },
  // fetchPersons: async () => {
  //   const persons = await getPersons();
  //   set(() => ({ persons }));
  // },
  // fetchPipelines: async () => {
  //   const pipelines = await getPipelines();
  //   set(() => ({ pipelines }));
  // },
  // fetchBenches: async () => {
  //   const benches = await getBenches();
  //   set(() => ({ benches }));
  // },
  // fetchBillings: async () => {
  //   const billings = await getBillings();
  //   set(() => ({ billings }));
  // },
  fetchClients: async (
    page = 1,
    limit = 10,
    filter: Record<string, any> = {}
  ) => {
    try {
      // Ensure filter is stringified if the API expects a string query
      const filterString = JSON.stringify(filter);
      const response = await getClients(page, limit, filterString);
      set({ clients: response });
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    }
  },

  updateClient: async (client) => {
    try {
      const updatedClient = await updateClient(client);
      set((state) => {
        const updatedClients = state.clients.map((c) =>
          c.id === updatedClient.id ? updatedClient : c
        );
        return { clients: updatedClients };
      });
    } catch (error) {
      console.error("Failed to update client:", error);
      throw error; // Ensure the error is thrown so it can be handled elsewhere if needed
    }
  },

  fetchProjects: async () => {
    const projects = await getProjects();
    set(() => ({ projects }));
  },
  fetchRoles: async () => {
    const roles = await getRoles();
    set(() => ({ roles }));
  },
  fetchUsers: async () => {
    const users = await getUsers();
    set(() => ({ users }));
  },
  fetchUserRoles: async () => {
    const userRoles = await getUserRoles();
    set(() => ({ userRoles }));
  },
}));
