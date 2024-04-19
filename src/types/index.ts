import { CandidateStatus, CandidateWorkStatus, Gender, Division, EmployeeStatus} from './enums'; // Assuming you have an enum for CandidateStatus

export interface Allocation{}

export interface Bench{
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

export interface Candidate{
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
    createdAt: EpochTimeStamp;
}

export interface Client{}

export interface Employee{
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

export interface EmployeeOpening{}

export interface Interview{}

export interface JobPosition{}

export interface Opening{}

export interface Person{
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

export interface Pipeline{
    id: number;
    candidateId: number;
    candidateInformation: Candidate;
    personInformation: Person;
    expectedSalary: number;
    pipelineSince: Date;
    pipelineEndDate: Date;
    activeDB: boolean;
}

export interface Project{}

export interface Role{}

export interface User{}

export interface UserRole{}