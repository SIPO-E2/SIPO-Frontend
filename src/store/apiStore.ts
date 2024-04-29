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

// const { getCandidates } = candidpage: number, limit: number, name: string, updatedStart: string, updatedEnd: stringateAPI;
// const { getAllJobPositions } = jobPositionAPI;
// const { getPersons } = personAPI;
// const { getPipelines } = pipelineAPI;
// const { getBenches } = benchAPI;
// const { getBillings } = billingAPI;
const { getClients, updateClient, getClientById, createClient, deleteClient } =
  clientAPI;
const { getProjects } = projectAPI;
const { getRoles } = roleAPI;
const { getUsers } = userAPI;
const { getUserRoles } = userRoleAPI;

interface Client {
  id: number;
  owner_user_id: number;
  owner_user: User;
  name: string;
  divisions: Division[];
  high_growth: boolean;
  projects: Project[];
  activeDB: boolean;
  joiningDate: Date;
  experience: string;
  salary: number;
  imageURL: string;
  contractFile: File | null;
  additionalDetails: string;
}

interface Role {
  id: string;
  name: string;
  users: User[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  activeDB: boolean;
}

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

  updateClient: (clientData: {
    id: number;
    name: string;
    owner_user_id: number;
    division: string;
    high_growth: boolean;
    imageURL: string;
    contractFile: string;
    joiningDate: string;
    experience: string;
    salary: string;
    additionalDetails: string;
  }) => Promise<Client>;
  createClient: (clientData: {
    name: string;
    owner_user_id: number;
    division: string;
    high_growth: boolean;
    imageURL: string;
    contractFile: string;
    joiningDate: string;
    experience: string;
    salary: string;
    additionalDetails: string;
  }) => Promise<Client>;
  deleteClient: (id: number) => Promise<void>;

  // fetchJobPositions: () => Promise<void>;
  // fetchCandidates: () => Promise<void>;
  // fetchPersons: () => Promise<void>;
  // fetchPipelines: () => Promise<void>;
  // fetchBenches: () => Promise<void>;
  // fetchBillings: () => Promise<void>;
  fetchClients: (
    page?: number,
    limit?: number,
    name?: string,
    divisions?: string,
    highGrowth?: boolean,
    activeDB?: boolean
  ) => Promise<void>;
  fetchClientById: (id: number) => Promise<void>;
  fetchProjects: () => Promise<void>;
  fetchRoles: (
    page?: number,
    limit?: number,
    name?: string,
    updatedStart?: string,
    updatedEnd?: string
  ) => Promise<void>;
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
    name = "",
    divisions = "",
    highGrowth = true,
    activeDB = true
  ) => {
    try {
      const response = await clientAPI.getClients(
        page,
        limit,
        name,
        divisions,
        highGrowth,
        activeDB
      );
      set({ clients: response.data });
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    }
  },

  fetchClientById: async (id: number) => {
    try {
      const client = await getClientById(id);
      if (client) {
        set((state) => ({
          clients: state.clients.some((c) => c.id === client.id)
            ? state.clients.map((c) => (c.id === client.id ? client : c))
            : [...state.clients, client],
        }));
      }
    } catch (error) {
      console.error("Failed to fetch client by id:", error);
    }
  },

  updateClient: async (clientData) => {
    try {
      const updatedClient = await clientAPI.updateClient(clientData);
      set((state) => ({
        clients: state.clients.map((client) =>
          client.id === updatedClient.id ? updatedClient : client
        ),
      }));
      return updatedClient;
    } catch (error) {
      console.error("Failed to update client:", error);
      throw error;
    }
  },

  createClient: async (clientData) => {
    try {
      const newClient = await clientAPI.createClient(clientData);
      set((state) => ({
        clients: [...state.clients, newClient],
      }));
      return newClient;
    } catch (error) {
      console.error("Failed to create client:", error);
      throw error;
    }
  },

  deleteClient: async (id) => {
    try {
      await clientAPI.deleteClient(id);
      set((state) => ({
        clients: state.clients.filter((client) => client.id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete client:", error);
      throw error;
    }
  },

  fetchProjects: async () => {
    const projects = await getProjects();
    set(() => ({ projects }));
  },
  fetchRoles: async (
    page = 1,
    limit = 10,
    name = "",
    updatedStart = "",
    updatedEnd = ""
  ) => {
    try {
      const response = await roleAPI.getRoles(
        page,
        limit,
        name,
        updatedStart,
        updatedEnd
      );
      set({ roles: response.data });
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    }
  },

  fetchUsers: async () => {
    try {
      const users = await getUsers();
      set(() => ({ users }));
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  },

  fetchUserRoles: async () => {
    const userRoles = await getUserRoles();
    set(() => ({ userRoles }));
  },
}));
