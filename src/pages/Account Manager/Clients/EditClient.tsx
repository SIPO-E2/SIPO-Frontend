import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef, FormEvent, ChangeEvent } from "react";
import "./Styles/EditClient.css";
import { useApisStore } from "../../../store/apiStore";

enum Division {
  Mexico = "Mexico",
  Brazil = "Brazil",
  CSA = "Central & South America",
  US = "United States",
}

const EditClient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchClientById, updateClient, clients, users, fetchUsers } =
    useApisStore((state) => ({
      fetchClientById: state.fetchClientById,
      updateClient: state.updateClient,
      clients: state.clients,
      users: state.users,
      fetchUsers: state.fetchUsers,
    }));

  /* ----------------- Updating the Owner_user:id --------------------- */
  useEffect(() => {
    fetchUsers(); // This will fetch all users if not already fetched
  }, [fetchUsers]);

  /* ----------------- Fetching the client --------------------- */

  const clientRef = useRef(
    clients.find((client) => client.id === parseInt(id || "0"))
  );
  const [client, setClient] = useState(clientRef.current);

  useEffect(() => {
    const clientId = parseInt(id ?? "");
    if (!clientId) {
      console.error("Invalid client ID");
      return; // Early return if the ID is not valid
    }

    // Function to load client data
    const loadClient = async () => {
      try {
        // Check if client is already in the state to avoid unnecessary API call
        const existingClient = clients.find((client) => client.id === clientId);
        if (existingClient) {
          setClient(existingClient);
        } else {
          // Only fetch if the client isn't already loaded
          await fetchClientById(clientId);
        }
      } catch (error) {
        console.error("Failed to fetch client:", error);
      }
    };

    loadClient();
  }, [id]); // Depend only on `id` to prevent infinite loops

  // Listening to clients updates from the store
  useEffect(() => {
    const foundClient = clients.find(
      (client) => client.id === parseInt(id ?? "")
    );
    if (foundClient) {
      setClient(foundClient);
    }
  }, [clients, id ?? ""]); // This depends on clients and id, but only updates the local state

  if (!client) {
    return <div>Loading client information...</div>;
  }

  /* ----------------- Updating the Client --------------------- */

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (target.type === "checkbox") {
      // Safely assert 'target' as 'HTMLInputElement'
      const checked = (target as HTMLInputElement).checked;
      setClient((prev) =>
        prev
          ? {
              ...prev,
              [name]: checked,
              divisions:
                name === "divisions"
                  ? checked
                    ? [...prev.divisions, value as Division]
                    : prev.divisions.filter((div) => div !== value)
                  : prev.divisions,
            }
          : undefined
      );
    } else if (target.type === "file") {
      // Safely assert 'target' as 'HTMLInputElement' and check for files
      const files = (target as HTMLInputElement).files;
      setClient((prev) =>
        prev
          ? {
              ...prev,
              [name]: files ? files[0] : null,
            }
          : undefined
      );
    } else {
      // Handle other inputs like 'text', 'select', and 'textarea'
      setClient((prev) =>
        prev
          ? {
              ...prev,
              [name]: value,
            }
          : undefined
      );
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!client || !client.name || client.owner_user_id <= 0) {
      alert("Please ensure all required fields are filled out.");
      return;
    }

    try {
      await updateClient(client);
      alert("Client updated successfully!");
    } catch (error) {
      console.error("Error updating client:", error);
      alert("Failed to update client.");
    }
  };

  if (!client) {
    return <div>Loading client information...</div>;
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
                {client.imageURL ? (
                  <img
                    src={client.imageURL}
                    alt={client.name}
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
                  value={client.imageURL || ""}
                  onChange={handleChange}
                  className="border-2 border-gray-300 bg-white h-10 px-2 rounded-l-lg text-sm focus:outline-none w-full"
                  readOnly
                  placeholder="Image URL"
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
                    name="name"
                    value={client.name || ""}
                    onChange={handleChange}
                    placeholder="Client Name"
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
                    value={
                      client.joiningDate
                        ? new Date(client.joiningDate)
                            .toISOString()
                            .slice(0, 10)
                        : ""
                    }
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
                    id="salary"
                    value={client.salary || ""}
                    onChange={handleChange}
                    placeholder="$  0.00"
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
                    value={client.owner_user_id}
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
                    name="additionalDetails"
                    value={client.additionalDetails || ""}
                    onChange={handleChange}
                    placeholder="Additional Details"
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
                    {Object.values(Division).map((div) => (
                      <div key={div}>
                        <input
                          type="checkbox"
                          name="divisions"
                          value={div}
                          checked={client.divisions.includes(div as Division)}
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
                        checked={client.experience === "No experience"}
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
                        checked={client.experience === "1 year exp"}
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
                        checked={client.experience === "2 year exp"}
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
                        checked={client?.experience === "> 3 year exp"}
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
                        name="high_growth"
                        checked={client?.high_growth || false}
                        onChange={handleChange}
                        className="sr-only peer"
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
                    htmlFor="file-upload-button"
                  >
                    Contract File:
                  </label>
                  {/* Muestra el nombre del archivo actual o permite subir uno nuevo */}
                  <div>
                    {client.contractFile
                      ? `Current file: ${client.contractFile.name}` // Asumiendo que guardas el objeto File
                      : "No file uploaded"}
                  </div>
                  <input
                    id="file-upload-button"
                    name="contractFile"
                    type="file"
                    onChange={handleChange}
                    className="block w-full cursor-pointer text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 py-1"
                  />
                </div>
              </div>
            </div>
            <button type="submit">Save Changes</button>
          </form>
        </div>

        <div className="flex px-10 pt-4 w-full justify-end">
          <div className="px-3">
            <Link to="/accountManager/clients">
              <button
                type="button"
                className="py-3 px-3 bg-gray-300 hover:bg-gray-500 text-xl
               text-white font-bold rounded"
              >
                Cancel
              </button>
            </Link>
          </div>

          <div className="">
            <Link to="/accountManager/clients">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex bg-blue-500 hover:bg-blue-700 text-xl text-white font-bold py-3 px-3 rounded"
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
