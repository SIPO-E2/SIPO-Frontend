//store/apisStore.ts

import { create } from "zustand";
import {
  JobPosition,
  Candidate,
  // Project,
  Opening,
  Person,
  Pipeline,
  Bench,
  Billing,
  Role,
  Client,
  User,
  UserRole,
} from "../types";
import {
  candidateAPI,
  jobPositionAPI,
  openingAPI,
  personAPI,
  // projectAPI,
  pipelineAPI,
  benchAPI,
  billingAPI,
  roleAPI,
  clientAPI,
  userAPI,
  userRoleAPI,
} from "../api";
import { ca } from "date-fns/locale";
const { getCandidates } = candidateAPI;
const { getAllJobPositions } = jobPositionAPI;
// const { getProjects, deleteProject } = projectAPI;
const { getOpenings } = openingAPI;
const { getPersons } = personAPI;
const { getPipelines } = pipelineAPI;
const { getBenches } = benchAPI;
const { getBillings } = billingAPI;
const { getRoles, getRoleById, updateRole, createRole } = roleAPI;
const { getClients, updateClient, getClientById, createClient, deleteClient } =
  clientAPI;
const { getUsers, createUser } = userAPI;
const { getUserRoles } = userRoleAPI;

type apiStore = {
  jobPositions: JobPosition[];
  candidates: Candidate[];
  // projects: Project[];
  openings: Opening[];
  persons: Person[];
  pipelines: Pipeline[];
  benches: Bench[];
  billings: Billing[];
  roles: Role[];
  totalRoles?: number;
  clients: Client[];
  users: User[];
  userRoles: UserRole[];

  /*------------------------- SETTERS ------------------ */

  setJobPositions: (jobPositions: JobPosition[]) => void;
  setCandidates: (candidates: Candidate[]) => void;
  // setProjects: (projects: Project[]) => void;
  setOpenings: (openings: Opening[]) => void;
  setPersons: (persons: Person[]) => void;
  setPipelines: (pipelines: Pipeline[]) => void;
  setBenches: (benches: Bench[]) => void;
  setBillings: (billings: Billing[]) => void;
  setRoles: (roles: Role[]) => void;
  setClients: (clients: Client[]) => void;
  setUsers: (users: User[]) => void;
  setUserRoles: (userRoles: UserRole[]) => void;

  /*------------------------- FETCH ---------------------*/

  fetchJobPositions: () => Promise<void>;
  fetchCandidates: () => Promise<void>;
  fetchOpenings: () => Promise<void>;
  // fetchProjects: () => Promise<void>;
  fetchPersons: () => Promise<void>;
  fetchPipelines: () => Promise<void>;
  fetchBenches: () => Promise<void>;
  fetchBillings: () => Promise<void>;
  fetchRoles: (
    page?: number,
    limit?: number,
    name?: string,
    updatedStart?: string,
    updatedEnd?: string,
    activeDB?: boolean
  ) => Promise<void>;
  fetchRoleById: (id: string) => Promise<void>;
  fetchUsers: (
    page?: number,
    limit?: number,
    name?: string,
    activeDB?: boolean
  ) => Promise<void>;
  fetchUserRoles: () => Promise<void>;
  fetchClients: (
    page?: number,
    limit?: number,
    name?: string,
    divisions?: string,
    highGrowth?: boolean,
    activeDB?: boolean
  ) => Promise<void>;
  fetchClientById: (id: number) => Promise<void>;

  /*----------------------- API CALLS --------------------- */

  updateRole: (roleData: { id: string; name: string }) => Promise<Role>;
  createRole: (roleData: { name: string }) => Promise<Role>;
  deleteRole: (id: string) => Promise<void>;

  createUser: (userData: {
    name: string;
    email: string;
    password: string;
    profileImage: string;
  }) => Promise<User>;

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
};

export const useApisStore = create<apiStore>((set) => ({
  jobPositions: [],
  candidates: [],
  // projects: [],
  openings: [],
  persons: [],
  pipelines: [],
  benches: [],
  billings: [],
  roles: [],
  clients: [],
  users: [],
  userRoles: [],

  setJobPositions: (jobPositions) => set(() => ({ jobPositions })),
  setCandidates: (candidates) => set(() => ({ candidates })),
  // setProjects: (projects) => set(() => ({ projects })),
  setOpenings: (openings) => set(() => ({ openings })),
  setPersons: (persons) => set(() => ({ persons })),
  setPipelines: (pipelines) => set(() => ({ pipelines })),
  setBenches: (benches) => set(() => ({ benches })),
  setBillings: (billings) => set(() => ({ billings })),
  setRoles: (roles) => set(() => ({ roles })),
  setUsers: (users) => set(() => ({ users })),
  setUserRoles: (userRoles) => set(() => ({ userRoles })),
  setClients: (clients) => set(() => ({ clients })),

  fetchJobPositions: async () => {
    const jobPositions = await getAllJobPositions();
    set(() => ({ jobPositions }));
  },
  fetchCandidates: async () => {
    const candidates = await getCandidates();
    set(() => ({ candidates }));
  },
  // fetchProjects: async () => {
  //   const projects = await getProjects(0, 10);
  //   console.log(projects);

  //   set(() => ({ projects }));
  // },

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
  /* ------------------------------ CLIENTS ----------------------------------- */
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

  /*--------------------- ROLES --------------------- */
  fetchRoles: async (
    page = 1,
    limit = 10,
    name = "",
    updatedStart = "",
    updatedEnd = "",
    activeDB = true
  ) => {
    try {
      const response = await roleAPI.getRoles(
        page,
        limit,
        name,
        updatedStart,
        updatedEnd,
        activeDB
      );
      set({ roles: response.data, totalRoles: response.pagination.total });
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    }
  },

  fetchRoleById: async (id: string) => {
    try {
      const role = await getRoleById(id);
      if (role) {
        set((state) => ({
          roles: state.roles.some((r) => r.id === role.id)
            ? state.roles.map((r) => (r.id === role.id ? role : r))
            : [...state.roles, role],
        }));
      }
    } catch (error) {
      console.error("Failed to fetch role by id:", error);
    }
  },

  createRole: async (roleData) => {
    try {
      const newRole = await roleAPI.createRole(roleData);
      set((state) => ({
        roles: [...state.roles, newRole],
      }));
      return newRole;
    } catch (error) {
      console.error("Failed to create role:", error);
      throw error;
    }
  },

  updateRole: async (roleData) => {
    try {
      const updatedRole = await roleAPI.updateRole(roleData);
      set((state) => ({
        roles: state.roles.map((role) =>
          role.id === updatedRole.id ? updatedRole : role
        ),
      }));
      return updatedRole;
    } catch (error) {
      console.error("Failed to update role:", error);
      throw error;
    }
  },

  deleteRole: async (id) => {
    try {
      await roleAPI.deleteRole(id);
      set((state) => ({
        roles: state.roles.filter((role) => role.id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete role:", error);
      throw error;
    }
  },

  /*--------------------- USERS --------------------- */

  fetchUsers: async (page = 1, limit = 12, name = "", activeDB = true) => {
    try {
      const response = await userAPI.getUsers(page, limit, name, activeDB);
      set({ users: response.data });
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  },

  createUser: async (userData) => {
    try {
      const newUser = await userAPI.createUser(userData);
      set((state) => ({
        users: [...state.users, newUser],
      }));
      return newUser;
    } catch (error) {
      console.error("Failed to create user:", error);
      throw error;
    }
  },

  /*--------------------- USER ROLES --------------------- */

  fetchUserRoles: async () => {
    const userRoles = await getUserRoles();
    set(() => ({ userRoles }));
  },
}));
