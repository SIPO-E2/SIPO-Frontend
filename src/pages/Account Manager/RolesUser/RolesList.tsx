import React from "react";

interface Role {
  id: string;
  name: string;
  users: User[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  activeDB: boolean;
}

interface RolesListProps {
  roles: Role[];
}

const RolesList: React.FC<RolesListProps> = ({ roles }) => {
  return (
    <div>
      {roles.map((role) => (
        <div key={role.id}>
          <h1>{role.name}</h1>
          <p>{role.id}</p>
          <p>{role.createdAt.toString()}</p>
          <h4>Shared:</h4>
          <ul>
            {role.users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RolesList;
