// ViewClient.tsx
import { useOutletContext } from "react-router-dom";
import "./ViewClient.css";

interface Client {
  id: number;
  imageURL: string;
  name: string;
  joiningDate: string;
  numberOfProjects: number;
  experience: string;
  money: string;
  division: string[];
  contractFile?: File | null;
  additionalDetails?: string;
  highGrowthClient: boolean;
}

const ViewClient = () => {
  const [currentClient] = useOutletContext<[Client | null]>();
  return (
    <div className="main-content2">
      <h1>HOLAA</h1>
      {/* Other content goes here */}
    </div>
  );
};

export default ViewClient;
