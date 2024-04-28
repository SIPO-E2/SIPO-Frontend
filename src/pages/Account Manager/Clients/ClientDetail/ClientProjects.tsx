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
    <div className="container-fluid" style={{ marginTop: "80px" }}>
      <div className="row">
        {currentClient && <ClientProjectsCards client={currentClient} />}
        {/* Use currentClient.id directly since we're now sure currentClient is not null */}
      </div>
    </div>
  );
};

export default ClientProjects;
