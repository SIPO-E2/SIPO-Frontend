import Project from "./projectsData";

// Now let's use typeof to reference the Project type
interface Client {
  id: number;
  imageURL: string;
  name: string;
  joiningDate: string;
  numberOfProjects: number;
  experience: string;
  money: string;
  highGrowthClient: boolean;
  division: string[];
  contractFile: File | null;
  additionalDetails: string;
  projects: (typeof Project)[]; // Use typeof to reference the Project type
}

const clients: Client[] = [
  {
    id: 1,
    imageURL:
      "https://api-prod-minimal-v510.vercel.app/assets/images/company/company_1.png",
    name: "The North Face",
    joiningDate: "2024-04-15",
    numberOfProjects: 5,
    experience: "5 years",
    money: "$120,000",
    highGrowthClient: true,
    division: ["Mexico", "USA", "Canada"],
    contractFile: null,
    additionalDetails:
      "North Face is a high-growth client with a lot of potential.",
    projects: [], // Initialize an empty array for projects
  },
  // Add more client objects as needed
];

export default clients;
