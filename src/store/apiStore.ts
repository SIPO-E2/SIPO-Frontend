//store/apisStore.ts

import { create } from "zustand";

import {
  JobPosition,
  Candidate,
  Project,
  Opening,
  Person,
  Pipeline,
  Bench,
  Billing,
  Allocation,
  Interview,
  Client,
  Role,
  UserRole,
  User,
} from "../types";
import {
  candidateAPI,
  jobPositionAPI,
  openingAPI,
  personAPI,
  projectAPI,
  pipelineAPI,
  benchAPI,
  billingAPI,
  allocationAPI,
  interviewAPI,
  clientAPI,
  roleAPI,
  userAPI,
  userRoleAPI,
} from "../api";
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
const { getRoles, getRoleById, updateRole, createRole } = roleAPI;
const { getUsers, createUser, deleteUser, updateUser, getUserById } = userAPI;
const { getUserRoles, createUserRole, updateUserRole, deleteUserRole } =
  userRoleAPI;
const { getClients, updateClient, getClientById, createClient, deleteClient } =
  clientAPI;

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
  roles: Role[];
  totalRoles?: number;
  users: User[];
  userRoles: UserRole[];

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
  setRoles: (roles: Role[]) => void;
  setUsers: (users: User[]) => void;
  setUserRoles: (userRoles: UserRole[]) => void;

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
  fetchUserById: (id: number) => Promise<void>;
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

  postPerson: (personData: any) => Promise<Person>;
  postCandidate: (candidateData: any) => Promise<Candidate>;
  postPipeline: (pipelineData: any) => Promise<Pipeline>;
  postBench: (benchData: any) => Promise<Bench>;
  postBilling: (billingData: any) => Promise<Billing>;
  createRole: (roleData: { name: string }) => Promise<Role>;
  createUser: (userData: {
    name: string;
    email: string;
    password: string;
    profileImage: string;
  }) => Promise<User>;
  createUserRole: (userRoleData: {
    userId: number;
    roleId: string;
  }) => Promise<UserRole>;
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

  updatePipeline: (id: string, pipelineData: any) => Promise<Pipeline>;
  updateBilling: (id: string, billingData: any) => Promise<Billing>;
  updateBench: (id: string, benchData: any) => Promise<Bench>;
  updateRole: (roleData: { id: string; name: string }) => Promise<Role>;
  updateUser: (userData: {
    id: number;
    name: string;
    email: string;
    password: string;
    profileImage: string;
  }) => Promise<User>;
  updateUserRole: (userRoleData: {
    id: number;
    userId: number;
    roleId: string;
  }) => Promise<UserRole>;
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

  deleteRole: (id: string) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  deleteUserRole: (id: number) => Promise<void>;
  deleteClient: (id: number) => Promise<void>;
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
  roles: [],
  users: [],
  userRoles: [],

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
  setRoles: (roles) => set(() => ({ roles })),
  setUsers: (users) => set(() => ({ users })),
  setUserRoles: (userRoles) => set(() => ({ userRoles })),
  setClients: (clients) => set(() => ({ clients })),

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
    const projects = await getProjects(0, 20);
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

  fetchUserById: async (id) => {
    try {
      const user = await getUserById(id);
      if (user) {
        set((state) => ({
          users: state.users.some((u) => u.id === user.id)
            ? state.users.map((u) => (u.id === user.id ? user : u))
            : [...state.users, user],
        }));
      }
    } catch (error) {
      console.error("Failed to fetch user by id:", error);
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

  deleteUser: async (id) => {
    try {
      await userAPI.deleteUser(id);
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete user:", error);
      throw error;
    }
  },

  updateUser: async (userData) => {
    try {
      const updatedUser = await userAPI.updateUser(userData);
      set((state) => ({
        users: state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        ),
      }));
      return updatedUser;
    } catch (error) {
      console.error("Failed to update user:", error);
      throw error;
    }
  },

  /*--------------------- USER ROLES --------------------- */

  fetchUserRoles: async () => {
    const userRoles = await getUserRoles();
    set(() => ({ userRoles }));
  },

  createUserRole: async (userRoleData) => {
    try {
      const newUserRole = await createUserRole(userRoleData);
      set((state) => ({
        userRoles: [...state.userRoles, newUserRole],
      }));
      return newUserRole;
    } catch (error) {
      console.error("Failed to create user role:", error);
      throw error;
    }
  },

  updateUserRole: async (userRoleData) => {
    try {
      const updatedUserRole = await updateUserRole(userRoleData);
      set((state) => ({
        userRoles: state.userRoles.map((userRole) =>
          userRole.id === updatedUserRole.id ? updatedUserRole : userRole
        ),
      }));
      return updatedUserRole;
    } catch (error) {
      console.error("Failed to update user role:", error);
      throw error;
    }
  },

  deleteUserRole: async (id) => {
    try {
      await deleteUserRole(id);
      set((state) => ({
        userRoles: state.userRoles.filter((userRole) => userRole.id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete user role:", error);
      throw error;
    }
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
}));
