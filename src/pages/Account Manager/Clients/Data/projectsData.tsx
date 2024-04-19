interface Project {
  id: number;
  clientId: number;
  projectName: string;
  status: string;
  posting_date: string;
  exp_closure_date: string;
  revenue: string;
  completed: number;
  toDo: number;
  assigned: number;
  employees: string[];
  employeesImage: string[];
}

const projects: Project[] = [
  {
    id: 1,
    clientId: 1,
    projectName: "Revamp Website",
    status: "In Progress",
    posting_date: "2024-04-15",
    exp_closure_date: "2024-06-30",
    // region: ["Hermosillo", "Phoenix"],
    revenue: "$50,000",
    completed: 40,
    toDo: 60,
    assigned: 4,
    // unassigned: 1,
    employees: ["Alice Johnson", "Bob Smith"],
    employeesImage: [
      "https://api-prod-minimal-v510.vercel.app/assets/images/employees/employee_1.png",
      "https://api-prod-minimal-v510.vercel.app/assets/images/employees/employee_2.png",
    ],
  },
  // Add more project objects as needed
];

export default projects;
