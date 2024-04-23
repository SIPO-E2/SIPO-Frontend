import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useApisStore } from "../../../store/apiStore";

const AddClient = () => {
  const [clientData, setClientData] = useState({
    name: "",
    division: "",
    highGrowth: false,
    additionalDetails: "",
    joiningDate: "",
    experience: "",
    money: "",
    ownerUserId: "",
    imageURL: "",
    contractFile: null,
  });
  const { createClient, users, fetchUsers } = useApisStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setClientData({ ...clientData, [name]: checked });
    } else if (type === "file") {
      setClientData({ ...clientData, [name]: files[0] });
    } else {
      setClientData({ ...clientData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(clientData).forEach(([key, value]) => {
        if (value !== null) formData.append(key, value);
      });

      await createClient(formData);
      alert("Client added successfully!");
      setClientData({
        name: "",
        division: "",
        highGrowth: false,
        additionalDetails: "",
        joiningDate: "",
        experience: "",
        money: "",
        ownerUserId: "",
        imageURL: "",
        contractFile: null,
      });
    } catch (error) {
      alert(`Failed to add client: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Add Client</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={clientData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Division:
          <select
            name="division"
            value={clientData.division}
            onChange={handleChange}
          >
            <option value="">Select a Division</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Sales">Sales</option>
          </select>
        </label>
        <label>
          High Growth:
          <input
            type="checkbox"
            name="highGrowth"
            checked={clientData.highGrowth}
            onChange={handleChange}
          />
        </label>
        <label>
          Additional Details:
          <textarea
            name="additionalDetails"
            value={clientData.additionalDetails}
            onChange={handleChange}
          ></textarea>
        </label>
        <label>
          Joining Date:
          <input
            type="date"
            name="joiningDate"
            value={clientData.joiningDate}
            onChange={handleChange}
          />
        </label>
        <label>
          Experience:
          <input
            type="text"
            name="experience"
            value={clientData.experience}
            onChange={handleChange}
          />
        </label>
        <label>
          Money:
          <input
            type="text"
            name="money"
            value={clientData.money}
            onChange={handleChange}
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="imageURL"
            value={clientData.imageURL}
            onChange={handleChange}
          />
        </label>
        <label>
          Contract File:
          <input type="file" name="contractFile" onChange={handleChange} />
        </label>
        <label>
          Owner User ID:
          <select
            name="ownerUserId"
            value={clientData.ownerUserId}
            onChange={handleChange}
          >
            <option value="">Select Owner User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Create Client</button>
      </form>
    </div>
  );
};

export default AddClient;
