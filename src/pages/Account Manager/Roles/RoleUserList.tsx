// Ejemplo de un componente que lista los roles
import React, { useEffect } from "react";
import { useApisStore } from "../../../store/apiStore";

const RoleUserList = () => {
  const { roles, fetchRoles } = useApisStore();

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return (
    <div>
      <h1>Roles and Associated Users</h1>
      <ul>
        {roles.map((role) => (
          <li key={role.id}>
            <strong>{role.name}</strong>
            <ul>
              {role.users.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleUserList;
