import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApisStore } from "../../../store/apiStore";
// import { User } from "../../../types";
import { Link } from "react-router-dom";

// IMPLEMENT USER UPDATE FUNCTIONALITY

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

export interface UserRole {
  id: number;
  userId: number;
  roleId: number;
  // createdAt: Date;
  // updatedAt: Date;
  // deletedAt: Date;
  activeDB: boolean;
}

interface UserFormData {
  name: string;
  email: string;
  password: string;
  profileImage: string;
  roles: string[];
}

const EditUser: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchUserById, updateUser } = useApisStore((state) => ({
    fetchUserById: state.fetchUserById,
    updateUser: state.updateUser,
  }));

  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const user = await fetchUserById(Number(id));
      if (user) {
        setName(user.name);
      }
    };
    fetchData();
  }, [fetchUserById, id]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser({
        id: Number(id),
        name: name,
      });
      navigate("/accountManager/users");
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Error updating user");
    }
  };

  return (
    <div>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <button type="submit">Update Name</button>
        <Link to="/accountManager/users">Cancel</Link>
      </form>
    </div>
  );
};

export default EditUser;
