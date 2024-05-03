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
  const { fetchUserById, updateUser, users, fetchRoles, roles } = useApisStore(
    (state) => ({
      fetchUserById: state.fetchUserById,
      updateUser: state.updateUser,
      users: state.users,
      fetchRoles: state.fetchRoles,
      roles: state.roles,
    })
  );

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

  useEffect(() => {
    if (users.length > 0) {
      const user = users.find((user) => user.id === Number(id));
      if (user) {
        setUserData({
          name: user.name,
          email: user.email,
          password: user.password,
          profileImage: user.profileImage,
          roles: user.roles.map((role) => role.id),
        });
      }
    }
  }, [users, id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = () => {
    updateUser({
      id: Number(id),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      profileImage: userData.profileImage,
    });
    // navigate("/accountManager/users");
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
        {/* <div>
          <label htmlFor="roles">Roles</label>
          {roles.map((role) => (
            <div key={role.id}>
              <label>
                <input
                  type="checkbox"
                  name="roles"
                  value={role.id}
                  checked={userData.roles.includes(role.id)}
                  onChange={() => handleRoleChange(role.id)}
                />
                {role.name}
              </label>
            </div>
          ))}
        </div> */}
        <Link to="/accountManager/users">
          {" "}
          <button type="button" onClick={handleSubmit}>
            Update
          </button>
        </Link>

        <Link to="/accountManager/users">Cancel</Link>
      </form>
    </div>
  );
};

export default EditUser;
