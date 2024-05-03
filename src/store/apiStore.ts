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
} from "../api";
const { getCandidates } = candidateAPI;
const { getAllJobPositions } = jobPositionAPI;
// const { getProjects, deleteProject } = projectAPI;
const { getOpenings } = openingAPI;
const { getPersons } = personAPI;
const { getPipelines } = pipelineAPI;
const { getBenches } = benchAPI;
const { getBillings } = billingAPI;
const { getRoles, getRoleById, updateRole, createRole } = roleAPI;

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

  setJobPositions: (jobPositions: JobPosition[]) => void;
  setCandidates: (candidates: Candidate[]) => void;
  // setProjects: (projects: Project[]) => void;
  setOpenings: (openings: Opening[]) => void;
  setPersons: (persons: Person[]) => void;
  setPipelines: (pipelines: Pipeline[]) => void;
  setBenches: (benches: Bench[]) => void;
  setBillings: (billings: Billing[]) => void;
  setRoles: (roles: Role[]) => void;

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

  updateRole: (roleData: { id: string; name: string }) => Promise<Role>;
  createRole: (roleData: { name: string }) => Promise<Role>;
  deleteRole: (id: string) => Promise<void>;
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

  setJobPositions: (jobPositions) => set(() => ({ jobPositions })),
  setCandidates: (candidates) => set(() => ({ candidates })),
  // setProjects: (projects) => set(() => ({ projects })),
  setOpenings: (openings) => set(() => ({ openings })),
  setPersons: (persons) => set(() => ({ persons })),
  setPipelines: (pipelines) => set(() => ({ pipelines })),
  setBenches: (benches) => set(() => ({ benches })),
  setBillings: (billings) => set(() => ({ billings })),
  setRoles: (roles) => set(() => ({ roles })),

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
}));
