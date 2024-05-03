import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApisStore } from "../../../store/apiStore";
// import { User } from "../../../types";
import { Link } from "react-router-dom";

// IMPLEMENT USER UPDATE FUNCTIONALITY

export interface Role {
  id: string;
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  profileImage: string;
  roles: Role[];
}

export interface UserRole {
  id: number;
  userId: number;
  roleId: number;
}

interface UserFormData {
  name: string;
  email: string;
  password: string;
  profileImage: string;
  roles: string[];
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
  const {
    fetchUserById,
    updateUser,
    fetchRoles,
    roles: allRoles,
    deleteUserRole,
    createUserRole,
  } = useApisStore((state) => ({
    fetchUserById: state.fetchUserById,
    updateUser: state.updateUser,
    fetchRoles: state.fetchRoles,
    roles: state.roles,
    deleteUserRole: state.deleteUserRole,
    createUserRole: state.createUserRole,
  }));

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const [userData, setUserData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    profileImage: "",
    roles: [],
  });

  useEffect(() => {
    const loadUserData = async () => {
      const user = await fetchUserById(Number(id));
      if (user) {
        setUserData({
          name: user.name,
          email: user.email,
          password: "",
          profileImage: user.profileImage,
          roles: user.roles.map((role) => role.id),
        });
      }
    };
    loadUserData();
  }, [fetchUserById, id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRoleChange = (roleId: string) => {
    setUserData((prevData) => ({
      ...prevData,
      roles: prevData.roles.includes(roleId)
        ? prevData.roles.filter((id) => id !== roleId)
        : [...prevData.roles, roleId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Elimina todos los roles del usuario
      await Promise.all(
        allRoles.map((role) =>
          deleteUserRole({ userId: Number(id), roleId: role.id })
        )
      );

      // Crea solo los roles seleccionados para el usuario
      await Promise.all(
        userData.roles.map((roleId) =>
          createUserRole({ userId: Number(id), roleId })
        )
      );

      // Actualiza los datos del usuario
      await updateUser({
        id: Number(id),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        profileImage: userData.profileImage,
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
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="profileImage">Profile Image</label>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Roles</label>
          {allRoles.map((role) => (
            <div key={role.id}>
              <input
                type="checkbox"
                id={`role-${role.id}`}
                checked={userData.roles.includes(role.id)}
                onChange={() => handleRoleChange(role.id)}
              />
              <label htmlFor={`role-${role.id}`}>{role.name}</label>
            </div>
          ))}
        </div>
        <button type="submit">Update</button>
        <Link to="/accountManager/users">Cancel</Link>
      </form>
    </div>
  );
};

export default EditUser;
