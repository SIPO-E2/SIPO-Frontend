import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApisStore } from "../../../store/apiStore";
// import { User } from "../../../types";
import { Link } from "react-router-dom";

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

  const [userData, setUserData] = useState<User>({
    id: 0,
    name: "",
    email: "",
    password: "",
    profileImage: "",
    roles: [],
    activeDB: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const parsedId = parseInt(id ?? "0");
        const user =
          users.find((user) => user.id === parsedId) ||
          (await fetchUserById(parsedId));
        if (!user) {
          throw new Error("User not found.");
        }
        setUserData(user);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setError("Failed to load user data.");
        setLoading(false);
      }
    };

    loadUser();
  }, [id, users, fetchUserById]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateUser(userData);
      navigate("/accountManager/users");
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user.");
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
          <div>
            <img src={userData.profileImage} alt="Profile" />
          </div>
          <input
            type="text"
            name="profileImage"
            value={userData.profileImage}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update User</button>
        <Link to="/accountManager/users">
          <button>Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default EditUser;
