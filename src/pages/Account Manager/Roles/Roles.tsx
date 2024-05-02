// Ejemplo de un componente que lista los roles
import React, { useEffect, useState } from "react";
import { useApisStore } from "../../../store/apiStore";
import "./Styles/Roles.css";
import EditRolePopUp from "../../../components/EditRolePopUp";

const Roles = () => {
  const { roles, fetchRoles, updateRole } = useApisStore((state) => ({
    roles: state.roles,
    fetchRoles: state.fetchRoles,
    updateRole: state.updateRole,
  }));

  useEffect(() => {
    fetchRoles(); // Fetch roles when component mounts
  }, []);

  const [selectedRole, setSelectedRole] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = (role) => {
    setSelectedRole(role);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedRole(null); // Reset selected role
  };

  const handleEditSubmit = (roleData) => {
    updateRole(roleData)
      .then(() => {
        closeEditModal();
      })
      .catch((error) => {
        console.error("Failed to update role", error);
      });
  };

  return (
    <div>
      <h1>Roles</h1>
      {roles.map((role) => (
        <div key={role.id}>
          <button onClick={() => openEditModal(role)}>{role.name}</button>
        </div>
      ))}
      <EditRolePopUp
        role={selectedRole}
        isOpen={isEditModalOpen}
        onSubmit={handleEditSubmit}
        onClose={closeEditModal}
      />
    </div>
  );
};

export default Roles;
