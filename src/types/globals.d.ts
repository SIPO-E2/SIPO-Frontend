// global.d.ts

enum Status {
  Open = "Open",
  OnGoing = "On Going",
  Closed = "Closed",
}

enum EmployeeStatus {
  Bench = "Bench",
  Billing = "Billing",
  Fired = "Fired",
}

enum CandidateStatus {
  StandBy = "Stand By",
  Hired = "Hired",
}

enum CandidateWorkStatus {
  Pipeline = "Pipeline",
  Employee = "Employee",
}

enum AllocationStatus {
  Allocated = "Allocated",
  ClientInterview = "Client Interview",
  ClientFeedback = "Client Feedback",
}

enum InterviewStatus {
  Scheduled = "Scheduled",
  Approved = "Approved",
  Rejected = "Rejected",
}

enum Region {
  Mexico = "Mexico",
  Brazil = "Brazil",
  USA = "USA",
}

enum Division {
  Mexico = "Mexico",
  Brazil = "Brazil",
  CSA = "Central & South America",
  US = "United States",
}

enum Exclusivity {
  Committed = "Committed",
  NonCommitted = "NonCommitted",
}

enum DemandCuration {
  Strategic = "Strategic",
  Committed = "Committed",
  Open = "Open",
}

enum PostingType {
  New_Headcount = "New_Headcount",
  Backfill = "Backfill",
  Replacement = "Replacement",
}

enum Gender {
  Male = "Male",
  Female = "Female",
}

/* --------------Nuevos cambios -------------------- */
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  profileImage: string;
  clients: Client[];
  projects: Project[];
  roles: Role[];
  activeDB: boolean;
}

interface Role {
  id: string;
  name: string;
  users: User[];
  // createdAt: Date;
  // updatedAt: Date;
  // deletedAt: Date;
  activeDB: boolean;
}
interface Client {
  id: number;
  owner_user_id: number;
  owner_user: User;
  name: string;
  division: Division;
  high_growth: boolean;
  projects: Project[];
  // employees: Employee[];
  activeDB: boolean;
  joiningDate: Date;
  experience: string;
  salary: number;
  imageURL: string;
  contractFile?: File | null;
  additionalDetails: string;
}

interface UserRole {
  id: number;
  userId: number;
  roleId: number;
  // createdAt: Date;
  // updatedAt: Date;
  // deletedAt: Date;
  activeDB: boolean;
}

/* -------------------------------------- */

interface Project {
  id: number;
  owner_user_id: number;
  owner_user: User;
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
  job_positions_list: JobPosition[];
  activeDB: boolean;
}

interface JobPosition {
  id: number;
  owner_project_id: number;
  owner_project: Project;
  name: string;
  status: Status;
  reason_current_status: string;
  status_date: Date;
  progress: number;
  bill_rate: number;
  division: Division;
  region: Region;
  cross_division: boolean;
  image: string;
  skills_position: string[];
  demand_curation: DemandCuration;
  posting_type: PostingType;
  exclusivity: Exclusivity;
  // TODO: ADD ALLOCATIONS
  openings_list: Opening[];
  // So we can use soft delete
  activeDB: boolean;
}

interface Opening {
  id: number;
  status: Status;
  status_date: Date;
  reason_current_status: string;
  open_date: Date;
  close_date: Date;
  close_reason: string;
  hours_required: number;
  owner_jobPosition_id: number;
  owner_jobPosition: JobPosition;
  activeDB: boolean;
}

interface Candidate {
  id: number;
  personId: number;
  personInformation: Person; // Referencia a Person
  status: CandidateStatus;
  workStatus: CandidateWorkStatus;
  reason_current_status: string;
  status_date: Date;
  propose_action: string;
  allocations: Allocation[]; // Asegúrate de definir el tipo de Allocation aquí o importarlo
  activeDB: boolean;
}

interface Person {
  id: number;
  name: string;
  email: string;
  celphone: number;
  gender: Gender;
  image: string;
  division: Division;
  tech_stack: string;
  skills: string[];
  candidateInformation: Candidate; // Referencia a Candidate
  activeDB: boolean;
}

interface Pipeline {
  id: number;
  candidateId: number;
  candidateInformation: Candidate;
  expectedSalary: number;
  pipelineSince: Date;
  pipelineEndDate: Date;
  activeDB: boolean;
}

interface Bench {
  id: number;
  employeeId: number;
  employeeInformation: Employee;
  benchSince: Date;
  billingStartDate: Date;
  activeDB: boolean;
}

interface Billing {
  id: number;
  employeeId: number;
  employeeInformation: Employee;
  billingSince: Date;
  workHours: number;
  activeDB: boolean;
}

/* -----------------Nuevos cambios ----------------- */
interface RoleCreationAttributes
  extends Optional<RoleAttributes, "id" | "activeDB" | "users"> {}

interface UserRoleCreationAttributes
  extends Optional<UserRoleAttributes, "id" | "activeDB"> {}

interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    "id" | "activeDB" | "clients" | "projects" | "roles"
  > {}
interface ClientCreationAttributes
  extends Optional<
    ClientAttributes,
    "id" | "activeDB" | "additonalDetails" | "owner_user" | "projects"
  > {}

interface UserRoleCreationAttributes
  extends Optional<UserRoleAttributes, "id" | "activeDB"> {}
/* -------------------------------------- */
interface ProjectCreationAttributes
  extends Optional<
    ProjectAttributes,
    | "id"
    | "progress"
    | "status_date"
    | "revenue"
    | "activeDB"
    | "owner_user"
    | "owner_client"
    | "job_positions_list"
  > {}

interface JobPositionCreationAttributes
  extends Optional<
    JobPositionAttributes,
    | "id"
    | "owner_project"
    | "status_date"
    | "progress"
    | "demand_curation"
    | "activeDB"
    | "openings_list"
  > {}

interface OpeningCreationAttributes
  extends Optional<
    OpeningAttributes,
    "id" | "activeDB" | "owner_jobPosition" | "status_date"
  > {}

interface CandidateCreationAttributes
  extends Omit<
    Candidate,
    "id" | "activeDB" | "personInformation" | "allocations"
  > {}

interface PersonCreationAttributes
  extends Omit<Person, "id" | "activeDB" | "candidateInformation"> {}

interface PipelineCreationAttributes
  extends Optional<
    PipelineAttributes,
    "id" | "activeDB" | "candidateInformation"
  > {}

interface BenchCreationAttributes
  extends Optional<
    BenchAttributes,
    "id" | "activeDB" | "employeeInformation"
  > {}

interface BillingCreationAttributes
  extends Optional<
    BillingAttributes,
    "id" | "activeDB" | "employeeInformation"
  > {}

interface AllocationCreationAttributes
  extends Omit<Allocation, "id" | "activeDB"> {}
