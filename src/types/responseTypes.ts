import {
  Project,
  Candidate,
  JobPosition,
  Opening,
  Person,
  Role,
  Client,
  User,
  UserRole,
} from ".";

//Person
export type PersonResponseArray = {
  status: string;
  data: Person[];
  message: string;
};

export type PersonResponse = {
  status: string;
  data: Person;
  message: string;
};

// Project
export type ProjectResponseArray = {
  status: string;
  data: Project[];
  message: string;
};

export type ProjectResponse = {
  status: string;
  data: Project;
  message: string;
};

// JobPosition
export type JobPositionResponseArray = {
  status: string;
  data: JobPosition[];
  message: string;
};

export type JobPositionResponse = {
  status: string;
  data: JobPosition;
  message: string;
};

// Opening
export type OpeningsResponseArray = {
  status: string;
  data: Opening[];
  message: string;
};

export type OpeningResponse = {
  status: string;
  data: Opening;
  message: string;
};

// Candidate
export type CandidateResponseArray = {
  status: string;
  data: Candidate[];
  message: string;
};

export type CandidateResponse = {
  status: string;
  data: Candidate;
  message: string;
};

// Role
export type RoleResponseArray = {
  pagination: any;
  status: string;
  data: Role[];
  message: string;
};

export type RoleResponse = {
  status: string;
  data: Role;
  message: string;
};

// UserRole

export type UserRoleResponseArray = {
  status: string;
  data: UserRole[];
  message: string;
};

export type UserRoleResponse = {
  status: string;
  data: UserRole;
  message: string;
};

// User
export type UserResponseArray = {
  status: string;
  data: User[];
  message: string;
};

export type UserResponse = {
  status: string;
  data: User;
  message: string;
};

// Client
export type ClientResponseArray = {
  status: string;
  data: Client[];
  message: string;
};

export type ClientResponse = {
  status: string;
  data: Client;
  message: string;
};
