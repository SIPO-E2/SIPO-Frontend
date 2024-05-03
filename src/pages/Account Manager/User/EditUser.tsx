import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApisStore } from "../../../store/apiStore";
// import { User } from "../../../types";

export interface Role {
  id: string;
  name: string;
  users: User[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  activeDB: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  profileImage: string;
  // clients: Client[];
  // projects: Project[];
  roles: Role[];
  activeDB: boolean;
}

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchUserById, updateUser, users } = useApisStore((state) => ({
    fetchUserById: state.fetchUserById,
    updateUser: state.updateUser,
    users: state.users,
  }));

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    profileImage: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const parsedId = parseInt(id ?? "");
        const user =
          users.find((user) => user.id === parsedId) ||
          (await fetchUserById(parsedId));
        if (!user) throw new Error("User not found.");
        setUserData({
          name: user.name,
          email: user.email,
          password: user.password || "",
          profileImage: user.profileImage || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setError("Failed to load user data.");
        setLoading(false);
      }
    };

    if (!users.length) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [id, users, fetchUserById]);

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      await updateUser({
        ...userData,
        id: parseInt(id ?? ""),
        password: "",
      });
      navigate("/users");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (loading) return <div>Loading user information...</div>;
  if (error) return <div>Error loading user: {error}</div>;

  return (
    <div>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Profile Image URL:</label>
          <input
            type="text"
            name="profileImage"
            value={userData.profileImage}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update User</button>
        <button onClick={() => navigate("/users")}>Cancel</button>
      </form>
    </div>
  );
};

export default EditUser;
