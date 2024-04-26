// global.d.ts

enum Status {
    Open = "Open",
    OnGoing = "On Going",
    Closed = "Closed"
 }

 enum EmployeeStatus {
    Bench = "Bench",
    Billing = "Billing",
    Fired = "Fired"
 }

 enum CandidateStatus {
    StandBy = "Stand By",
    Hired = "Hired"
 }

 enum CandidateWorkStatus {
    Pipeline = "Pipeline",
    Employee = "Employee"
 }

 enum AllocationStatus {
    Allocated = "Allocated",
    ClientInterview = "Client Interview",
    ClientFeedback = "Client Feedback"
 }

 enum InterviewStatus {
    Scheduled = "Scheduled",
    Approved = "Approved",
    Rejected = "Rejected"
 }

 enum Region {
    Mexico = "Mexico",
    Brazil = "Brazil",
    USA = "USA"
 }

 enum Division {
    Mexico = "Encora Mexico",
    Brazil = "Encora Brazil",
    CSA = "Encora Central and South America",
    US = "Encora United States"
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
    Replacement = "Replacement"
 }

 enum Gender {
    Male = "Male",
    Female = "Female"
 }

export interface Client {
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
   money: number;
   imageURL: string;
   contractFile?: File | null;
   additionalDetails: string;
 }


interface Project{
    id: number;
    owner_user_id: number;
    owner_user: User;
    owner_client_id: number;
    owner_client: Client;
    name: string;
    status: Status;
    reason_current_status: string;
    status_date: string;
    progress: number;
    revenue: number;
    region: Region;
    posting_date: string;
    exp_closure_date: string;
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



interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id' |'progress'| 'status_date' | 'revenue' | 'activeDB' | "owner_user" | "owner_client" | "job_positions_list"> {}

interface JobPositionCreationAttributes extends Optional<JobPositionAttributes, "id" | "owner_project"| "status_date"| "progress"| "demand_curation" | "activeDB" | "openings_list" > {}

interface OpeningCreationAttributes extends Optional<OpeningAttributes, 'id' | "activeDB" | "owner_jobPosition"| "status_date" > { }

interface CandidateCreationAttributes extends Omit<Candidate, 'id' | 'activeDB' | 'personInformation' | 'allocations'> {}

interface PersonCreationAttributes extends Omit<Person, 'id' | 'activeDB' | 'candidateInformation'> {}
