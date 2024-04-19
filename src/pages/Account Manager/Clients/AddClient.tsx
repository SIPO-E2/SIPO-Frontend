import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

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

const AddClient: React.FC = () => {
  const [formData, setFormData] = useState<Client>({
    id: Math.floor(Math.random() * 1000000), // Generar un ID aleatorio
    imageURL: "",
    name: "",
    joiningDate: "",
    numberOfProjects: 0,
    experience: "",
    money: "",
    division: [],
    contractFile: null,
    additionalDetails: "",
    highGrowthClient: false,
  });

  const [fileName, setFileName] = useState("");

  useEffect(() => {
    console.log("Form Data Updated:", formData);
  }, [formData]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target as HTMLInputElement;
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
          imageURL: reader.result as string,
        }));
      };

      reader.readAsDataURL(file);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        imageURL: "",
      }));
    }
  };

  const handleSubmit = () => {
    console.log("Submitting Client Data:", formData);
    alert(`Client ${formData.name} added successfully!`);
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
                  id="name"
                  name="name"
                  placeholder="Enter client's name"
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
                  onChange={handleChange}
                />
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
              className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Client
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddClient;
