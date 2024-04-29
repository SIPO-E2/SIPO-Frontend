// Ejemplo de un componente que lista los roles
import React, { useEffect } from "react";
import { useApisStore } from "../../../store/apiStore";
import "./Styles/Roles.css";

const RoleUserList = () => {
  const { roles, fetchRoles } = useApisStore();

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return (
    <div className="main">
      <div className="body-content-roles">
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
    </div>
  );
};

export default RoleUserList;
