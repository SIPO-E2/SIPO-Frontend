import { Project, Candidate, JobPosition, Opening, Person, Pipeline, Employee, Bench, Billing, Interview, Allocation, Client} from ".";


//Person
export type PersonResponseArray = {
   status: string;
   data: Person[];
   message: string;
}
 
 export type PersonResponse = {
   status: string;
   data: Person;
   message: string;
 }

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

 //Cliente
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
 }
 
export type OpeningResponse = {
   status: string;
   data: Opening;
   message: string;
 }
 

 // Candidate
export type CandidateResponseArray = {
   status: string;
   data: Candidate[];
   message: string;
}
 
export type CandidateResponse = {
   status: string;
   data: Candidate;
   message: string;
}

 //Pipeline
export type PipelineResponseArray = {
   status: string;
   data: Pipeline[];
   message: string;
}

export type PipelineResponse = {
   status: string;
   data: Pipeline;
   message: string;
}

 //Employee
export type EmployeeResponseArray = {
   status: string;
   data: Employee[];
   message: string;
}

export type EmployeeResponse = {
   status: string;
   data: Employee;
   message: string;
}

 //Bench
export type BenchResponseArray = {
   status: string;
   data: Bench[];
   message: string;
}

export type BenchResponse = {
   status: string;
   data: Bench;
   message: string;
}

//Billing
export type BillingResponseArray = {
   status: string;
   data: Billing[];
   message: string;
}

export type BillingResponse = {
   status: string;
   data: Billing;
   message: string;
}
 
 // Interview
 export type InterviewResponseArray = {
   status: string;
   data: Interview[];
   message: string;
}

export type InterviewResponse = {
   status: string;
   data: Interview;
   message: string;
}

// Allocation

export type AllocationResponseArray = {
   status: string;
   data: Allocation[];
   message: string;
}

export type AllocationResponse = {
   status: string;
   data: Allocation;
   message: string;
}