import { Optional } from "sequelize";

/* -------------------- ENUMS ------------------ */
export enum Status {
  Open = "Open",
  OnGoing = "On Going",
  Closed = "Closed",
}

export enum EmployeeStatus {
  Bench = "Bench",
  Billing = "Billing",
  Fired = "Fired",
}

export enum CandidateStatus {
  StandBy = "Stand By",
  Hired = "Hired",
}

export enum CandidateWorkStatus {
  Pipeline = "Pipeline",
  Employee = "Employee",
}

export enum AllocationStatus {
  Allocated = "Allocated",
  ClientInterview = "Client Interview",
  ClientFeedback = "Client Feedback",
}

export enum InterviewStatus {
  Scheduled = "Scheduled",
  Approved = "Approved",
  Rejected = "Rejected",
}

export enum Region {
  Mexico = "Mexico",
  Brazil = "Brazil",
  USA = "USA",
}

export enum Division {
  Mexico = "Mexico",
  Brazil = "Brazil",
  CSA = "Central & South America",
  US = "United States",
}

export enum Exclusivity {
  Committed = "Committed",
  NonCommitted = "NonCommitted",
}

export enum DemandCuration {
  Strategic = "Strategic",
  Committed = "Committed",
  Open = "Open",
}

export enum PostingType {
  New_Headcount = "New_Headcount",
  Backfill = "Backfill",
  Replacement = "Replacement",
}

export enum Gender {
  Male = "Male",
  Female = "Female",
}

/* -------------- INTERFACES -------------------- */

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  profileImage: string;
  clients: Client[];
  projects: ProjectAttributes[];
  roles: RoleAttributes[];
  activeDB: boolean;
}

export interface RoleAttributes {
  id: string;
  name: string;
  users: UserAttributes[];
  activeDB: boolean;
}

export interface UserRoleAttributes {
  id: number;
  userId: number;
  roleId: number;
  activeDB: boolean;
}

export interface ClientAttributes {
  id: number;
  owner_user_id: number;
  owner_user: UserAttributes;
  name: string;
  division: Division;
  high_growth: boolean;
  projects: ProjectAttributes[];
  // employees: Employee[];
  activeDB: boolean;
  joiningDate: Date;
  experience: string;
  salary: number;
  imageURL: string;
  contractFile?: File | null;
  additionalDetails: string;
}

export interface ProjectAttributes {
  id: number;
  owner_user_id: number;
  owner_user: UserAttributes;
  owner_client_id: number;
  owner_client: Client;
  name: string;
  status: Status;
  reason_current_status: string;
  status_date: Date;
  progress: number;
  revenue: number;
  region: Region;
  posting_date: Date;
  exp_closure_date: Date;
  image: string;
  // job_positions_list: JobPosition[];
  activeDB: boolean;
}

/* -------------- Creation Attributes -------------------- */

export interface RoleCreationAttributes
  extends Optional<RoleAttributes, "id" | "activeDB" | "users"> {}

export interface UserRoleCreationAttributes
  extends Optional<UserRoleAttributes, "id" | "activeDB"> {}

export interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    "id" | "activeDB" | "clients" | "projects" | "roles"
  > {}

export interface ClientCreationAttributes
  extends Optional<
    ClientAttributes,
    "id" | "activeDB" | "additionalDetails" | "owner_user" | "projects"
  > {}

export interface UserRoleCreationAttributes
  extends Optional<UserRoleAttributes, "id" | "activeDB"> {}

export interface ProjectCreationAttributes
  extends Optional<
    ProjectAttributes,
    | "id"
    | "progress"
    | "status_date"
    | "revenue"
    | "activeDB"
    | "owner_user"
    | "owner_client"
  > {}
