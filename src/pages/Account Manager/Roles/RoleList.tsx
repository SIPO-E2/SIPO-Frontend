// Ejemplo de un componente que lista los roles
import React, { useEffect } from "react";
import { useApisStore } from "../../../store/apiStore";

const RoleList = () => {
  const { roles, fetchRoles } = useApisStore();

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return (
    <div>
      <h1>Roles</h1>
      <ul>
        {roles.map((role) => (
          <li key={role.id}>{role.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoleList;
