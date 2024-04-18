import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react"; // Importa useState
import "./Styles/EditClient.css";
import clientes from "./Data/data";

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

const ensureArray = (value: string | string[] | undefined): string[] => {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") return [value];
  return [];
};

const EditClient: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    console.log("No ID provided");
    return <div>No client specified!</div>;
  }

  const initialClient = clientes.find((client) => client.id === parseInt(id));
  if (!initialClient) {
    console.log("Client not found for ID:", id);
    return (
      <div className="main-content">
        <h1>Client Not Found</h1>
      </div>
    );
  }

  const [formData, setFormData] = useState<Client>({
    ...initialClient,
    division: ensureArray(initialClient.division),
    additionalDetails: initialClient.additionalDetails || "",
    contractFile: null,
    highGrowthClient: initialClient.highGrowthClient || false,
  });

  const [fileName, setFileName] = useState("");

  useEffect(() => {
    console.log("Form data updated:", formData);
  }, [formData]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target as HTMLInputElement; // Cast to HTMLInputElement
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDivisionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setFormData((prevState) => {
      const newDivisions = checked
        ? [...prevState.division, value]
        : prevState.division.filter((div) => div !== value);
      return { ...prevState, division: newDivisions };
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setFileName(file.name);
      setFormData((prevState) => ({ ...prevState, contractFile: file }));
    } else {
      setFileName("");
      setFormData((prevState) => ({ ...prevState, contractFile: null }));
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          // Update the imageURL field with the base64 encoded string of the image
          imageURL: reader.result as string,
        }));
      };

      reader.readAsDataURL(file); // This will trigger onloadend after reading
    } else {
      // Reset the imageURL to an empty string or initial URL if no file is selected
      setFormData((prevState) => ({
        ...prevState,
        imageURL: "",
      }));
    }
  };

  return (
    <div className="main-content">
      <div>
        <div className="text-left px-5 pt-4 mb-5">
          <h1>Edit Client</h1>
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
                    onChange={handleImageUpload}
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
                      placeholder={fileName || "No file chosen"}
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
                        onChange={handleFileChange}
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
                    {["Mexico", "Colombia", "USA", "Canada", "Brazil"].map(
                      (division) => (
                        <div key={division} className="flex items-center">
                          <input
                            type="checkbox"
                            name="division"
                            value={division}
                            checked={formData.division.includes(division)}
                            onChange={handleDivisionChange}
                            className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label className="ml-2 text-m text-gray-700">
                            {division}
                          </label>
                        </div>
                      )
                    )}
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
                        checked={formData.highGrowthClient}
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
            <button
              type="button"
              className=" flex bg-blue-500 hover:bg-blue-700 text-white item-left font-bold py-2 px-4 rounded"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditClient;
