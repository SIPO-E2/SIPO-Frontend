import React, { useState, useEffect, ChangeEvent } from "react";
import { useApisStore } from "../../../store/apiStore";

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
interface Project {
  id: number;
  owner_user_id: number;
  owner_user: User;
  owner_client_id: number;
  owner_client: Client;
  name: string;
  status: Status;
  reason_current_status: string;
  status_date: Date;
  progress: number;
  revenue: number;
  region: Region;
  posting_date: Date;
  exp_closure_date: Date;
  image: string;
  job_positions_list: JobPosition[];
  activeDB: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  profileImage: string;
  clients: Client[];
  projects: Project[];
  roles: Role[];
  activeDB: boolean;
}

enum Division {
  Mexico = "Mexico",
  Brazil = "Brazil",
  CSA = "Central & South America",
  US = "United States",
}

interface ClientFormData {
  name: string;
  divisions: string[];
  high_growth: boolean;
  additionalDetails: string;
  joiningDate: string;
  experience: string;
  salary: string;
  owner_user_id: number;
  imageURL: string;
  contractFile: File | null;
}

const AddClient: React.FC = () => {
  const [clientData, setClientData] = useState<ClientFormData>({
    name: "",
    divisions: [],
    high_growth: false,
    additionalDetails: "",
    joiningDate: "",
    experience: "",
    salary: "",
    owner_user_id: 1,
    imageURL: "",
    contractFile: null,
  });

  const { createClient, users, fetchUsers } = useApisStore();

  useEffect(() => {
    fetchUsers().catch(console.error);
  }, [fetchUsers]);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = event.target as HTMLInputElement;
    const { name, value, type, checked, files } = target;

    if (type === "checkbox") {
      if (name === "high_growth") {
        setClientData((prev) => ({
          ...prev,
          high_growth: checked,
        }));
      } else {
        const updatedDivisions = checked
          ? [...clientData.divisions, value]
          : clientData.divisions.filter((div) => div !== value);
        setClientData((prev) => ({
          ...prev,
          divisions: updatedDivisions,
        }));
      }
    } else if (type === "file") {
      setClientData((prev) => ({
        ...prev,
        [name]: files ? files[0] : null,
      }));
    } else {
      setClientData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (
      !clientData.name ||
      clientData.owner_user_id <= 0 ||
      !clientData.divisions.length ||
      !clientData.joiningDate ||
      !clientData.salary ||
      !clientData.experience
    ) {
      alert("Please ensure all required fields are filled out.");
      return;
    }

    try {
      const formData = {
        name: clientData.name,
        owner_user_id: clientData.owner_user_id,
        divisions: clientData.divisions, // Send as an array
        high_growth: clientData.high_growth,
        imageURL: clientData.imageURL,
        contractFile: clientData.contractFile
          ? clientData.contractFile.name
          : "",
        joiningDate: clientData.joiningDate,
        experience: clientData.experience,
        salary: clientData.salary,
        additionalDetails: clientData.additionalDetails,
      };

      const newClient = await createClient({
        ...formData,
        division: formData.divisions.join(", "),
      });
      console.log("Client created:", newClient);
      alert("Client added successfully!");
      setClientData({
        name: "",
        divisions: [],
        high_growth: false,
        additionalDetails: "",
        joiningDate: "",
        experience: "",
        salary: "",
        owner_user_id: 1,
        imageURL: "",
        contractFile: null,
      });
    } catch (error) {
      console.error("Failed to create client:", error);
      alert("Failed to add client: " + (error || JSON.stringify(error)));
    }
  };

  return (
    <div className="main-content">
      <div className="text-left px-5 pt-4 mb-5">
        <h1 className="font-bold">Create a new client</h1>
      </div>

      <div className="flex p-10 gap-4">
        <div className="w-1/4">
          <div className="flex flex-col items-center p-5 bg-white shadow rounded">
            <div className="w-full h-64 border-2 border-gray-300 border-dashed rounded flex justify-center items-center mb-4">
              {clientData.imageURL ? (
                <img
                  src={clientData.imageURL}
                  alt="Preview"
                  className="rounded-md max-w-full max-h-64 object-cover"
                />
              ) : (
                <span className="text-gray-500">No image selected</span>
              )}
            </div>
            <div className="w-full flex items-center">
              <input
                type="text"
                name="imageURL"
                onChange={handleChange}
                placeholder="Image URL"
                className="border-2 border-gray-300 bg-white h-10 px-2 rounded-l-lg text-sm focus:outline-none w-full"
                readOnly
                value={clientData.imageURL || "No URL"}
              />
              <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg cursor-pointer">
                Browse
                <input
                  type="file"
                  id="image-upload"
                  name="image-upload"
                  className="sr-only"
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
        </div>

        <form
          className="flex-1 mt-0 bg-white p-5 shadow rounded"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-wrap">
            <div className="px-3 sm:w-1/2">
              <div className="mb-5">
                <label className="block text-left font-bold sm:text-lg pb-3">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter client's name"
                  value={clientData.name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="px-3 sm:w-1/2">
              <div className="mb-5">
                <label className="block text-left font-bold sm:text-lg pb-3">
                  Joining Date
                </label>
                <input
                  type="date"
                  id="joiningDate"
                  name="joiningDate"
                  value={clientData.joiningDate}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>

            <div className="px-3 sm:w-1/2">
              <div className="mb-5">
                <label className="block text-left font-bold sm:text-lg pb-3">
                  Salary
                </label>
                <input
                  type="number"
                  name="salary"
                  value={clientData.salary}
                  onChange={handleChange}
                  placeholder="$  0.00"
                  id="salary"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="px-3 sm:w-1/2">
              <div className="mb-5">
                <label className="block text-left font-bold sm:text-lg pb-3">
                  Owner User
                </label>
                <select
                  name="owner_user_id"
                  value={clientData.owner_user_id}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="px-3 sm:w-full">
              <div className="mb-5">
                <label className="block text-left font-bold sm:text-lg pb-3">
                  Additional Details
                </label>
                <textarea
                  id="additionalDetails"
                  name="additionalDetails"
                  placeholder="Enter any additional information here"
                  value={clientData.additionalDetails}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  rows={3}
                />
              </div>
            </div>
            <div className="px-3 sm:w-full">
              <div className="mb-5">
                <label className="block text-left font-bold sm:text-lg pb-3">
                  Division
                </label>
                <div className="flex items-center gap-4">
                  {Object.values(Division).map((div) => (
                    <div key={div} className="flex items-center">
                      <input
                        type="checkbox"
                        name="divisions"
                        value={div}
                        checked={clientData.divisions.includes(div as Division)}
                        onChange={handleChange}
                        className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 font-normal">{div}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-3 sm:w-1/2">
              <div className="mb-5">
                <label className="block text-left font-bold sm:text-lg pb-3">
                  Experience Requirements
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="experience"
                      value="No experience"
                      checked={clientData.experience === "No experience"}
                      onChange={handleChange}
                      className="form-radio"
                    />
                    <span
                      className="ml-2 font-normal"
                      style={{ color: "rgb(33, 43, 54)" }}
                    >
                      No experience
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="experience"
                      value="1 year exp"
                      checked={clientData.experience === "1 year exp"}
                      onChange={handleChange}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 font-normal">1 year exp</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="experience"
                      value="2 year exp"
                      checked={clientData.experience === "2 year exp"}
                      onChange={handleChange}
                      className="form-radio"
                    />
                    <span className="ml-2 font-normal">2 year exp</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="experience"
                      value="> 3 year exp"
                      checked={clientData.experience === "> 3 year exp"}
                      onChange={handleChange}
                      className="form-radio"
                    />
                    <span className="ml-2 font-normal">&#62; 3 year exp</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="px-3 sm:w-full">
              <div className="mb-5">
                <label className="block text-left font-bold sm:text-lg pb-3">
                  High-Growth Client
                </label>
                <div className="flex items-center">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id="high_growth"
                      name="high_growth"
                      className="sr-only peer"
                      checked={clientData.high_growth}
                      onChange={handleChange}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
            <div className="px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  className="block text-left font-bold sm:text-lg pb-3"
                  htmlFor="contractFile"
                >
                  Contract File:
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  id="contractFile"
                  name="contractFile"
                  type="file"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <button type="submit">Create Client</button>
        </form>
      </div>
    </div>
  );
};

export default AddClient;
