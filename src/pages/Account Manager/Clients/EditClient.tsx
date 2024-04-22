import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react"; // Importa useState
import "./Styles/EditClient.css";
import { useApisStore } from "../../../store/apiStore";
import { getClientById } from "../../../api/clientAPI";

enum Division {
  IT = "IT",
  HR = "HR",
  Finance = "Finance",
  Sales = "Sales",
}

interface Client {
  id: number;
  owner_user_id: number;
  owner_user: User;
  name: string;
  division: Division[];
  high_growth: boolean;
  projects: Project[];
  activeDB: boolean;
  joiningDate: Date;
  experience: string;
  money: string;
  imageURL: string;
  contractFile?: File | null;
  additionalDetails: string;
}

interface FormData {
  id?: number;
  owner_user_id?: number;
  name: string;
  division: string[]; // Array of strings to match checkbox inputs
  high_growth: boolean;
  joiningDate: string;
  experience: string;
  money: string;
  imageURL: string;
  additionalDetails: string;
  contractFile?: File | null;
}

const EditClient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchClientById, updateClient } = useApisStore((state) => ({
    fetchClientById: state.fetchClientById,
    updateClient: state.updateClient,
  }));

  const [formData, setFormData] = useState<FormData>({
    name: "",
    division: [],
    high_growth: false,
    joiningDate: "",
    experience: "",
    money: "",
    imageURL: "",
    additionalDetails: "",
    contractFile: null,
  });

  useEffect(() => {
    if (id) {
      fetchClientById(parseInt(id))
        .then((client) => {
          if (client != null) {
            setFormData({
              id: (client as Client).id,
              owner_user_id: (client as Client).owner_user_id,
              name: (client as Client).name,
              division: (client as Client).division.map((d) => Division[d]),
              high_growth: (client as Client).high_growth,
              joiningDate: (client as Client).joiningDate
                .toISOString()
                .slice(0, 10),
              experience: (client as Client).experience,
              money: (client as Client).money,
              imageURL: (client as Client).imageURL,
              additionalDetails: (client as Client).additionalDetails,
              contractFile: null,
            });
          }
        })
        .catch((error) => {
          console.error("Failed to fetch client:", error);
        });
    }
  }, [id, fetchClientById]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = event.target as HTMLInputElement;
    if (type === "checkbox" && name === "division") {
      const newDivision = checked
        ? [...formData.division, value]
        : formData.division.filter((div) => div !== value);
      setFormData((prev) => ({ ...prev, division: newDivision }));
    } else if (type === "file") {
      const file = (event.target as HTMLInputElement).files?.[0];
      setFormData((prev) => ({ ...prev, contractFile: file }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formData.id) {
      try {
        await updateClient(formData);
        alert(`Client ${formData.name} updated successfully!`);
      } catch (error) {
        console.error("Failed to update client:", error);
        alert("Failed to update client.");
      }
    } else {
      alert("Client ID is missing.");
    }
  };

  if (!formData.name) {
    return (
      <div className="main-content">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div>
        <div className="text-left px-5 pt-4 mb-5">
          <h1 className="font-bold">Edit Client</h1>
        </div>

        <div className="flex p-10 gap-4">
          <div className="w-1/4">
            <div className="flex flex-col items-center p-5 bg-white shadow rounded">
              <div className="w-full h-64 border-2 border-gray-300 border-dashed rounded flex justify-center items-center mb-4">
                {/* Mostrar la previsualización de la imagen o un marcador de posición */}
                {formData.imageURL ? (
                  <img
                    src={formData.imageURL}
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
                  placeholder="Image URL"
                  className="border-2 border-gray-300 bg-white h-10 px-2 rounded-l-lg text-sm focus:outline-none w-full"
                  readOnly
                  value={formData.imageURL || "No URL"}
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

          <form className="flex-1 mt-0 bg-white p-5 shadow rounded">
            <div className="flex flex-wrap">
              <div className="px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="block text-left font-bold sm:text-lg pb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    id="Name"
                    name="name"
                    placeholder={formData.name}
                    value={formData.name}
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
                    className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    value={formData.joiningDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* New file upload section with a button */}
              <div className="px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="block text-left font-bold sm:text-lg pb-3">
                    Contract
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder={formData.contractFile?.name || "No file"}
                      className="w-full rounded-l-md border border-r-0 border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      readOnly
                    />
                    <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-r-md cursor-pointer">
                      Browse
                      <input
                        type="file"
                        id="document-upload"
                        name="document-upload"
                        className="sr-only"
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  {/* <p className="text-xs leading-5 text-gray-600 pt-2">
                    Acceptable formats: PDF, DOCX, TXT
                  </p> */}
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
                    value={formData.additionalDetails}
                    onChange={handleChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    rows={3}
                  ></textarea>
                </div>
              </div>

              <div className="px-3 sm:w-full">
                <div className="mb-5">
                  <label className="block text-left font-bold sm:text-lg pb-3">
                    Division
                  </label>
                  <div className="flex items-center gap-4">
                    {["IT", "Finance", "Sales"].map((division) => (
                      <div key={division} className="flex items-center">
                        <input
                          type="checkbox"
                          name="division"
                          value={division}
                          checked={formData.division.includes(division)}
                          onChange={handleChange}
                          className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="ml-2 text-m text-gray-700">
                          {division}
                        </label>
                      </div>
                    ))}
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
                        name="highGrowthClient"
                        id="highGrowthClient"
                        className="sr-only peer"
                        checked={formData.high_growth}
                        onChange={handleChange}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="flex px-10 pt-4 w-full justify-end">
          <div className="px-3">
            <Link to="/accountManager/clients">
              <button
                type="button"
                className="py-2 px-4 bg-gray-300 hover:bg-gray-500 text-white font-bold rounded"
              >
                Cancel
              </button>
            </Link>
          </div>

          <div className=" ">
            <Link to="/accountManager/clients">
              <button
                type="button"
                onClick={handleSubmit}
                className=" flex bg-blue-500 hover:bg-blue-700 text-white item-left font-bold py-2 px-4 rounded"
              >
                Save Changes
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditClient;
