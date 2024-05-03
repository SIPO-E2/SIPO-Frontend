import React, { useEffect, useState, ChangeEvent } from "react";
// import { User } from "../../../types";
import { useApisStore } from "../../../store/apiStore";
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

const AddUser: React.FC = () => {
  const [userData, setUserData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    profileImage: "",
    roles: [], // Inicializar roles como un arreglo vacío
  });

  const [allRoles, setAllRoles] = useState<Role[]>([]);

  const { createUser, fetchRoles, createUserRole, roles } = useApisStore(
    (state) => ({
      createUser: state.createUser,
      fetchRoles: state.fetchRoles,
      createUserRole: state.createUserRole,
      roles: state.roles,
    })
  );

  useEffect(() => {
    async function loadRoles() {
      await fetchRoles();
      console.log("Roles fetched:", roles);
      setAllRoles(roles); // This ensures that we are trying to set the roles after fetching
    }
    loadRoles();
  }, [fetchRoles, roles]);
  const handleRoleChange = (roleId: string) => {
    setUserData((prevState) => {
      const newRoles = prevState.roles.includes(roleId)
        ? prevState.roles.filter((id) => id !== roleId)
        : [...prevState.roles, roleId];
      return { ...prevState, roles: newRoles };
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    if (name === "image-upload" && files) {
      const profileImage = URL.createObjectURL(files[0]);
      setUserData({ ...userData, profileImage });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (
      !userData.name ||
      !userData.email ||
      !userData.password ||
      !userData.profileImage
    ) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const newUser = await createUser({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        profileImage: userData.profileImage,
      });

      if (newUser && userData.roles.length > 0) {
        await Promise.all(
          userData.roles.map((roleId) =>
            createUserRole({ userId: newUser.id, roleId })
          )
        );
        alert("User and roles created successfully!");
      } else {
        alert("User created successfully but no roles assigned!");
      }

      setUserData({
        name: "",
        email: "",
        password: "",
        profileImage: "",
        roles: [],
      });
    } catch (error) {
      console.error("Error creating user or roles:", error);
      alert("Error creating user or roles");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {userData.profileImage ? (
          <img src={userData.profileImage} alt="Profile" />
        ) : (
          <p>No image uploaded</p>
        )}
      </div>
      <label>
        Name:
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter user's name"
          value={userData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter user's email"
          value={userData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter user's password"
          value={userData.password}
          onChange={handleChange}
        />
      </label>
      <label>
        Profile Image:
        <input
          type="file"
          id="image-upload"
          name="image-upload"
          accept="image/*"
          onChange={handleChange}
        />
      </label>

      <div>
        Roles:
        {allRoles.map((role) => (
          <div key={role.id}>
            <label>
              <input
                type="checkbox"
                name="roles"
                value={role.id}
                checked={userData.roles?.includes(role.id) ?? false}
                onChange={() => handleRoleChange(role.id)}
              />
              {role.name}
            </label>
          </div>
        ))}
      </div>

      <Link to="/accountManager/users">
        <button>Back to Users</button>
      </Link>
      <button type="submit">Create User</button>
    </form>
  );
};

export default AddUser;
