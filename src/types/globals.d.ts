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
    IT = "IT",
    HR = "HR",
    Finance = "Finance",
    Sales = "Sales"
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

interface CandidateCreationAttributes extends Omit<Candidate, 'id' | 'activeDB' | 'personInformation' | 'allocations'> {}

interface PersonCreationAttributes extends Omit<Person, 'id' | 'activeDB' | 'candidateInformation'> {}