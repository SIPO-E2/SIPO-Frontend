// global.d.ts

enum Status {
   Open = "Open",
   OnGoing = "On Going",
   Closed = "Closed"
}

export enum EmployeeStatus {
   Bench = "Bench",
   Billing = "Billing",
   Hired = "Proactive hire",
   Resigned = "Proactive hire",
   Other = "Attrited/Resigned"
}

export enum CandidateStatus {
   StandBy = "Stand By",
   Hired = "Hired",
   Other = "Other"
}

export enum CandidateWorkStatus {
   Pipeline = "Pipeline",
   Employee = "Employee",
   Other = "Other"
}

enum AllocationStatus {
   Allocated = "Allocated",
   ClientInterview = "Client Interview",
   ClientFeedback = "Client Feedback"
}

export enum InterviewStatus {
   Scheduled = "Scheduled",
   Approved = "Approved",
   Rejected = "Rejected"
}

export enum Region {

   CDMX = "CDMX",
   HMO = "HMO",
   CUU = "CUU",
   MID = "MID",
   SLP = "SLP",

   CAMP = "CAMPINA",
   SAOPA = "SAO PAULO",

   COLOM = "COLOMBIA",
   PERU = "PERU",
   CR = "COSTA RICA",
   ARG = "ARGENTINA",
   DOM = "DOMINICANA",
   DLL = "DALLAS",
   PHX = "PHOENIX"
}

export enum Division {
   Mexico = "Encora Mexico",
   Brazil = "Encora Brazil",
   CSA = "Encora Central & South America",
   US = "Encora United States",
   default = "Encora"
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
   Replacement = "Replacement"
}

export enum Gender {
   Male = "Male",
   Female = "Female",
   Unknown = "Unknown"
}

export enum ReasonCurrentStatus{
   InTraining = "In training",
   Induction = "Induction/Orientation",
   Shadow = "Shadow resource",
   AwaitingClient = "Awaiting client confirmation/joining",
   Maternity = "Maternity leave",
   Sabbatical = "Sabbatical/Other leave",
   PrevCA ="Previous Client attrition",
   PrevCHCr = "Previous Client HC reduction",
   TranBP = "Transition between projects",
   NoAvailableProjects = "Transition between projects",
   InternalProject = "Internal project",
   MovedBilling = "Moved to billing",
   PerformanceIssue = "Performance issues/PIP ",
   Intern = "Intern",
   OtherRCS = "Other",
}

export enum ProposedAction{
   ProjectSearch = "Project search",
   InternProject = "Using in internal project",
   UpSkilling = "Upskilling/Cross training",
   Backup = "Backup/Shadow other projects",
   ResourcePool = "Resource pool",
   NoAction = "No action required",
   OtherPA = "Others",
   Attrition = "Attrition"
}

export interface Project{
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

 export interface Candidate {
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

export interface Person {
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

export interface Pipeline {
   id: number;
   candidateId: number;
   candidateInformation: Candidate;
   expectedSalary: number;
   pipelineSince: Date;
   pipelineEndDate: Date;
   activeDB: boolean;
}

export interface Bench {
   id: number;
   employeeId: number;
   employeeInformation: Employee;
   benchSince: Date;
   billingStartDate: Date;
   activeDB: boolean;
}

export interface Billing{
   id: number;
    employeeId: number;
    employeeInformation: Employee;
    billingSince: Date;
    workHours: number;
    activeDB: boolean;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id' |'progress'| 'status_date' | 'revenue' | 'activeDB' | "owner_user" | "owner_client" | "job_positions_list"> {}

interface JobPositionCreationAttributes extends Optional<JobPositionAttributes, "id" | "owner_project"| "status_date"| "progress"| "demand_curation" | "activeDB" | "openings_list" > {}

interface OpeningCreationAttributes extends Optional<OpeningAttributes, 'id' | "activeDB" | "owner_jobPosition"| "status_date" > { }

interface CandidateCreationAttributes extends Optional<Candidate, 'id' | 'activeDB' | 'personInformation' | 'allocations'> {}

interface PersonCreationAttributes extends Optional<Person, 'id' | 'activeDB' | 'candidateInformation'> {}

interface PipelineCreationAttributes extends Optional<PipelineAttributes, 'id' | 'activeDB' | "candidateInformation"> {}

interface BenchCreationAttributes extends Optional<BenchAttributes, 'id' | 'activeDB' | "employeeInformation"> {}

interface BillingCreationAttributes extends Optional<BillingAttributes, 'id' | 'activeDB' | "employeeInformation"> {}

interface AllocationCreationAttributes extends Omit<Allocation, 'id' | 'activeDB'> {}