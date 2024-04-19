// ViewClient.tsx
import { useOutletContext } from "react-router-dom";

// ... (Client interface)

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
    <div className="main-content">
      {/* Left Side with conditional rendering if currentClient exists */}
      {currentClient && (
        <div className="md:col-span-2 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {currentClient.name}
          </h2>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Job Description
            </h3>
            <p className="text-gray-600 text-sm">
              {/* You can use currentClient's properties to show the job description */}
            </p>
          </div>
          {/* ... Other sections like Key Responsibilities ... */}
        </div>
      )}

      {/* Right Side ... */}
    </div>
  );
};

export default ViewClient;
