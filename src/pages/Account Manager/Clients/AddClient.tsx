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
  });
  const { createClient, users, fetchUsers } = useApisStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createClient({
        ...clientData,
        high_growth: clientData.highGrowth,
        owner_user_id: parseInt(clientData.ownerUserId),
      });
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
      });
    } catch (error) {
      alert(`Failed to add client: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Aquí van los campos del formulario, incluido el nuevo desplegable para owner_user_id */}
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
      {/* Botón de envío y otros campos del formulario */}
      <button type="submit">Create Client</button>
    </form>
  );
};

export default AddClient;
