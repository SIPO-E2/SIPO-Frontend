import { useOutletContext } from "react-router-dom";
import "./ClientProjects.css";

import ClientProjectsCards from "./ClientProjectCards";

interface Client {
  id: number;
  owner_user_id: number;
  owner_user: User;
  name: string;
  divisions: Division[];
  high_growth: boolean;
  projects: Project[];
  activeDB: boolean;
  joiningDate: Date;
  experience: string;
  salary: number;
  imageURL: string;
  contractFile: File | null;
  additionalDetails: string;
}
const ClientProjects = () => {
  const [currentClient] = useOutletContext() as [
    Client | null,
    React.Dispatch<React.SetStateAction<Client | null>>
  ];

  return (
    <div className="client-projects-container">
      <div className="mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
          {currentClient && <ClientProjectsCards client={currentClient} />}
          {/* Use currentClient.id directly since we're now sure currentClient is not null */}
        </div>
      </div>
    </div>
  );
};

export default ClientProjects;
