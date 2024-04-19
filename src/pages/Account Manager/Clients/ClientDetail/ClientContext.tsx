import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import clients from "../Data/data";
import projects from "../Data/projectsData";

// Define the Project interface
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

// Define the Client interface
interface Client {
  id: number;
  imageURL: string;
  name: string;
  joiningDate: string;
  numberOfProjects: number;
  experience: string;
  money: string;
  division: string[];
  contractFile: File | null;
  additionalDetails: string;
  highGrowthClient: boolean;
  projects: Project[]; // Ensure projects is an array of Project objects
}

// Provide a default structure for the context value
const defaultContextValue: [
  Client | null,
  React.Dispatch<React.SetStateAction<Client | null>>
] = [null, () => {}];
const ClientContext = createContext(defaultContextValue);

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [currentClient, setCurrentClient] = useState<Client | null>(null);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        // Simulating an API call with a delay
        const clientData = clients.find((client) => client.id === 1);
        if (clientData) {
          // Filter projects for the current client
          const clientProjects = projects.filter(
            (project) => project.clientId === clientData.id
          );
          const updatedClientData = { ...clientData, projects: clientProjects };
          return updatedClientData;
        } else {
          throw new Error("Client not found");
        }
      } catch (error) {
        console.error("Failed to fetch client data", error);
        return null;
      }
    };

    fetchClientData().then((clientData) => {
      if (clientData) {
        setCurrentClient(clientData);
      }
    });
  }, []);

  return (
    <ClientContext.Provider value={[currentClient, setCurrentClient]}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = () => useContext(ClientContext);
