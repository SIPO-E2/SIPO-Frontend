import {Division,Status, Region, DemandCuration, EmployeeStatus, CandidateStatus, InterviewStatus, AllocationStatus, CandidateWorkStatus, PostingType, Exclusivity, Gender } from '.';


export interface Role {
   id: string;
   name: string;
   users: User[];
   activeDB: boolean;
}

export interface User {
   id: number;
   name: string;
   email: string;
   password: string;
   clients: Client[];
   projects: Project[];
   roles: Role[]; 
   activeDB: boolean;
}

export interface UserRole {
   id: number;
   userId: number;
   roleId: number;
   activeDB: boolean;
}

export interface Client {
   id: number;
   owner_user_id: number;
   owner_user: User;
   name: string;
   division: Division;
   high_growth: boolean;
   projects: Project[];
   activeDB: boolean;
   joiningDate: Date;
   experience: string;
   money: number;
   imageURL: string;
   contractFile?: File | null;
   additionalDetails: string;
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

export interface JobPosition {
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
    activeDB: boolean;
  }

export interface Opening {
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
   candidateInformation: Candidate; 
   activeDB: boolean;
}

export interface Candidate {
   id: number;
   personId: number;
   personInformation: Person; 
   status: CandidateStatus;
   workStatus: CandidateWorkStatus;
   reason_current_status: string;
   status_date: Date;
   propose_action: string;
   allocations: Allocation[];
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


export interface Employee {
   id: number;
   candidateId: number;
   candidateInformation: Candidate;
   status: EmployeeStatus;
   reason_current_status: string;
   status_date: Date;
   salary: number;
   job_title: string;
   job_grade:string;
   joining_date: Date;
   openings: Opening[];
   activeDB: boolean;
}

export interface EmployeeOpening {
   id: number;
   employeeId: number;
   openingId: number;
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


export interface Billing {
   id: number;
   employeeId: number;
   employeeInformation: Employee;
   billingSince: Date;
   workHours: number;
   activeDB: boolean;
}

export interface Allocation {
   id: number;
   status: AllocationStatus;
   reason_current_status: string;
   status_date: Date;
   candidateId: number;
   candidate: Candidate;
   jobPositionId: number;
   jobPosition: JobPosition;
   client_id: number;
   client: Client;
   interviews: Interview[];
   details: string;
   activeDB: boolean;
}

export interface Interview {
   id: string;
   status: InterviewStatus;
   reason_current_status: string;
   status_date: Date;
   allocation_id: number;
   allocation: Allocation;
   interview_date: Date;
   activeDB: boolean;
}


// Creation
export interface InterviewCreation extends Partial<Omit<Interview, 'id' | 'activeDB' | "allocation" | "status_date">> {}

export interface AllocationCreation extends Partial<Omit<Allocation, 'id' | 'activeDB' | "candidate" | "client" | "jobPosition" | "interviews" | "status_date">> {}

export interface RoleCreation extends Partial<Omit<Role, 'id' | 'activeDB'| 'users' >> {}

export interface UserCreation extends Partial<Omit<User, 'id' | "activeDB" | "clients" | "projects" | "roles">> {}

export interface UserRoleCreation extends Partial<Omit<UserRole, 'id' | 'activeDB' >> {}

export interface ProjectCreation extends Partial<Omit<Project, 'id' |'progress'| 'status_date' | 'revenue' | 'activeDB' | "owner_user" | "owner_client" | "job_positions_list">> {}

export interface JobPositionCreation extends Partial<Omit<JobPosition, "id" | "owner_project"| "status_date"| "progress"| "demand_curation" | "activeDB" | "openings_list" >> {}

export interface OpeningCreation extends Partial<Omit<Opening, 'id' | "activeDB" | "owner_jobPosition"| "status_date" >> { }

export interface CandidateCreation extends Partial<Omit<Candidate, 'id' | 'activeDB' | 'personInformation' | 'allocations'>> {}

export interface PersonCreation extends Partial<Omit<Person, 'id' | 'activeDB' | 'candidateInformation'>> {}

export interface PipelineCreation extends Partial<Omit<Pipeline, 'id' | 'activeDB' | "candidateInformation">> {}

export interface EmployeeCreation extends Partial<Omit<Employee, 'id'| "activeDB" | "status_date" | "openings" | "candidateInformation">> {}

export interface EmployeeOpeningCreation extends Partial<Omit<EmployeeOpening, 'id' | 'activeDB'>> {}

export interface BenchCreation extends Partial<Omit<Bench, 'id' | 'activeDB' | "employeeInformation">> {}

export interface BillingCreation extends Partial<Omit<Billing, 'id' | 'activeDB' | "employeeInformation">> {}


//Update

export interface RoleUpdate extends Partial<Role> {}

export interface UserUpdate extends Partial<User> {}

export interface ClientUpdate extends Partial<Client> {}

export interface ProjectUpdate extends Partial<Project> {}

export interface JobPositionUpdate extends Partial<JobPosition> {}

export interface OpeningUpdate extends Partial<Opening> {}

export interface CandidateUpdate extends Partial<Candidate> {}

export interface PipelineUpdate extends Partial<Pipeline> {}

export interface EmployeeUpdate extends Partial<Employee> {}

export interface EmployeeOpeningUpdate extends Partial<EmployeeOpening> {}

export interface BenchUpdate extends Partial<Bench> {}

export interface BillingUpdate extends Partial<Billing> {}
