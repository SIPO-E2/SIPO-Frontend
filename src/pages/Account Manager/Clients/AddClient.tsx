import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useApisStore } from "../../../store/apiStore";

enum Division {
  IT = "IT",
  HR = "HR",
  Finance = "Finance",
  Sales = "Sales",
}

interface ClientFormData {
  name: string;
  division: Division;
  highGrowth: boolean;
  additionalDetails: string;
  joiningDate: string;
  experience: string;
  money: string;
  ownerUserId: string;
  imageURL: string;
  contractFile: File | null;
}

const AddClient: React.FC = () => {
  const [clientData, setClientData] = useState<ClientFormData>({
    name: "",
    division: Division.IT,
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement; // Aserción de tipo para 'checked'
      setClientData({ ...clientData, [name]: target.checked });
    } else if (type === "file") {
      const target = e.target as HTMLInputElement; // Aserción de tipo para 'files'
      setClientData({
        ...clientData,
        [name]: target.files ? target.files[0] : null,
      });
    } else {
      setClientData({ ...clientData, [name]: value });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    Object.entries(clientData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        formData.append(key, value);
      }
    });

    try {
      await createClient(formData);
      alert("Client added successfully!");
      setClientData({
        name: "",
        division: Division.IT,
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
      alert(`Failed to add client: ${(error as Error).message}`);
    }
  };

  return (
    <div>
      <h1>Add New Client</h1>
      <form onSubmit={handleSubmit}>
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
            {Object.values(Division).map((div) => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
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
          />
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
            type="number"
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
