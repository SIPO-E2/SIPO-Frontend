export enum Status {
  Open = "Open",
  OnGoing = "On Going",
  Closed = "Closed",
}

export enum EmployeeStatus {
  Bench = "Bench",
  Billing = "Billing",
  Hired = "Proactive hire",
  Resigned = "Proactive hire",
  Other = "Attrited/Resigned",
}

export enum CandidateStatus {
  StandBy = "Stand By",
  Hired = "Hired",
  Other = "Other",
}

export enum CandidateWorkStatus {
  Pipeline = "Pipeline",
  Employee = "Employee",
  Other = "Other",
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
  PHX = "PHOENIX",
  Mexico = "Mexico",
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
  Unknown = "Unknown",
}

export enum ReasonCurrentStatus {
  InTraining = "In training",
  Induction = "Induction/Orientation",
  Shadow = "Shadow resource",
  AwaitingClient = "Awaiting client confirmation/joining",
  Maternity = "Maternity leave",
  Sabbatical = "Sabbatical/Other leave",
  PrevCA = "Previous Client attrition",
  PrevCHCr = "Previous Client HC reduction",
  TranBP = "Transition between projects",
  NoAvailableProjects = "Transition between projects",
  InternalProject = "Internal project",
  MovedBilling = "Moved to billing",
  PerformanceIssue = "Performance issues/PIP ",
  Intern = "Intern",
  OtherRCS = "Other",
}

export enum ProposedAction {
  ProjectSearch = "Project search",
  InternProject = "Using in internal project",
  UpSkilling = "Upskilling/Cross training",
  Backup = "Backup/Shadow other projects",
  ResourcePool = "Resource pool",
  NoAction = "No action required",
  OtherPA = "Others",
  Attrition = "Attrition",
}
