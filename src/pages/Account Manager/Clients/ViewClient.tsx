import { useParams } from "react-router-dom";

const ViewClient = () => {
  const { id } = useParams<{ id: string }>();
  console.log("The client that we are watching has the id: " + id);
  return (
    <div className="main-content">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side */}
        <div className="md:col-span-2 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Marketing Manager
          </h2>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Job Description
            </h3>
            <p className="text-gray-600 text-sm">
              // Job description text goes here.
            </p>
          </div>
          {/* ... Other sections like Key Responsibilities ... */}
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          {/* Details Box */}
          <div className="p-6 bg-red-600 text-white rounded-lg shadow-lg">
            <div className="mb-4">
              <h4 className="text-lg font-semibold">Date Posted</h4>
              <p className="text-sm">15 Apr 2024</p>
            </div>
            {/* ... Other details like Expiration date, Employment type ... */}
          </div>

          {/* Company Box */}
          <div className="p-6 bg-red-600 text-white rounded-lg shadow-lg">
            <h4 className="text-lg font-semibold">
              Gleicher, Mueller and Tromp
            </h4>
            <p className="text-sm">
              1147 Rohan Drive Suite 819 - Burlington, VT / 80201
            </p>
            <p className="text-sm">904-966-2836</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewClient;
