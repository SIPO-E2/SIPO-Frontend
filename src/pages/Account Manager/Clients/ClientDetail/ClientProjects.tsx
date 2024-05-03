import { useOutletContext } from "react-router-dom";
import "./ClientProjects.css";

import ClientProjectsCards from "./ClientProjectCards";
import { Client } from "../../../../types";

const ClientProjects = () => {
  const [currentClient] = useOutletContext() as [
    Client | null,
    React.Dispatch<React.SetStateAction<Client | null>>
  ];

  return (
    <div className="main-content-client-projects">
      <div className="body-content-clients-projects">
        {currentClient && <ClientProjectsCards client={currentClient} />}
      </div>
    </div>
  );
};

export default ClientProjects;
