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
  const {
    fetchUserById,
    updateUser,
    users,
    fetchRoles,
    roles,
    updateUserRole,
  } = useApisStore((state) => ({
    fetchUserById: state.fetchUserById,
    updateUser: state.updateUser,
    users: state.users,
    fetchRoles: state.fetchRoles,
    roles: state.roles,
    updateUserRole: state.updateUserRole,
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
    fetchUserById(Number(id));
  }, [fetchUserById, id]);

  // Add this state to keep track of the original roles
  const [originalRoles, setOriginalRoles] = useState<string[]>([]);

  useEffect(() => {
    const loadUserData = async () => {
      const user = await fetchUserById(Number(id));
      if (user) {
        setUserData({
          name: user.name,
          email: user.email,
          password: "", // No cargar la contraseña existente por razones de seguridad
          profileImage: user.profileImage,
          roles: user.roles.map((role) => role.id),
        });
        setOriginalRoles(user.roles.map((role) => role.id));
      }
    };
    fetchRoles();
    loadUserData();
  }, [fetchUserById, fetchRoles, id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRoleChange = (roleId: string) => {
    setUserData((prevData) => {
      if (prevData.roles.includes(roleId)) {
        // Si el rol ya está seleccionado, lo quitamos
        return {
          ...prevData,
          roles: prevData.roles.filter((role) => role !== roleId),
        };
      } else {
        // Si el rol no está seleccionado, lo agregamos
        return {
          ...prevData,
          roles: [...prevData.roles, roleId],
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser({
        id: Number(id),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        profileImage: userData.profileImage,
      });

      // Ejemplo para actualizar todos los roles: eliminar todos primero, luego añadir los nuevos
      // Esto es solo un ejemplo y podría requerir ajustes según tu lógica de negocio
      const rolesToRemove = originalRoles.filter(
        (role) => !userData.roles.includes(role)
      );
      const rolesToAdd = userData.roles.filter(
        (role) => !originalRoles.includes(role)
      );

      await Promise.all([
        ...rolesToRemove.map((roleId) =>
          deleteUserRole({ userId: Number(id), roleId })
        ),
        ...rolesToAdd.map((roleId) =>
          createUserRole({ userId: Number(id), roleId })
        ),
      ]);

      navigate("/accountManager/users");
    } catch (error) {
      console.error("Failed to update user or roles:", error);
      alert("Error updating user or roles");
    }
  };

  return (
    <div>
      <h1>Edit User</h1>
      <form>
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
          {roles.map((role) => (
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
        <button type="button" onClick={handleSubmit}>
          Update
        </button>

        <Link to="/accountManager/users">Cancel</Link>
      </form>
    </div>
  );
};

export default EditUser;
