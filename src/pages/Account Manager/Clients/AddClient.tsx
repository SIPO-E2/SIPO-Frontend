import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useApisStore } from "../../../store/apiStore";

const AddClient = () => {
  const [name, setName] = useState("");
  const [division, setDivision] = useState("");
  const [highGrowth, setHighGrowth] = useState(false);
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [experience, setExperience] = useState("");
  const [money, setMoney] = useState("");
  const [ownerUserId, setOwnerUserId] = useState("");

  const { createClient, users } = useApisStore();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newClient = {
        name,
        division,
        high_growth: highGrowth,
        additionalDetails,
        joiningDate: new Date(joiningDate), // Convert string date to Date object
        experience,
        money: parseFloat(money), // Convert money input to float
        owner_user_id: parseInt(ownerUserId), // Convert user ID from string to integer
      };
      await createClient(newClient);
      alert("Client added successfully!");
      // Clear the form
      setName("");
      setDivision("");
      setHighGrowth(false);
      setAdditionalDetails("");
      setJoiningDate("");
      setExperience("");
      setMoney("");
      setOwnerUserId("");
    } catch (error) {
      alert(`Failed to add client: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Add Client</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Division:
          <select
            value={division}
            onChange={(e) => setDivision(e.target.value)}
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
            checked={highGrowth}
            onChange={(e) => setHighGrowth(e.target.checked)}
          />
        </label>
        <label>
          Additional Details:
          <textarea
            value={additionalDetails}
            onChange={(e) => setAdditionalDetails(e.target.value)}
          />
        </label>
        <label>
          Joining Date:
          <input
            type="date"
            value={joiningDate}
            onChange={(e) => setJoiningDate(e.target.value)}
          />
        </label>
        <label>
          Experience:
          <input
            type="text"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </label>
        <label>
          Money:
          <input
            type="text"
            value={money}
            onChange={(e) => setMoney(e.target.value)}
          />
        </label>
        <label>
          Owner User ID:
          <select
            value={ownerUserId}
            onChange={(e) => setOwnerUserId(e.target.value)}
          >
            <option value="">Select a User</option>
            {users &&
              users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
          </select>
        </label>

        <button type="submit">Add Client</button>
      </form>
    </div>
  );
};

export default AddClient;
