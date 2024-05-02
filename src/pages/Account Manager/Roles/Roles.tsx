// Ejemplo de un componente que lista los roles
import React, { useEffect, useState } from "react";
import { useApisStore } from "../../../store/apiStore";
import "./Styles/Roles.css";
import EditRolePopup from "../../../components/EditRolePopUp";

const Roles = () => {
  const { roles, fetchRoles, updateRole } = useApisStore((state) => ({
    roles: state.roles,
    fetchRoles: state.fetchRoles,
    updateRole: state.updateRole,
  }));

  useEffect(() => {
    fetchRoles(); // Fetch roles when component mounts
  }, []);

  const [selectedRole, setSelectedRole] = useState(null); // Quitado el tipo Role | null ya que se define después
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const openEditPopup = (role) => {
    // Quitado el tipo Role ya que se define después
    setSelectedRole(role);
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
    setSelectedRole(null); // Reset selected role
  };

  const handleEditSubmit = (roleData) => {
    updateRole(roleData)
      .then(() => {
        closeEditPopup();
      })
      .catch((error) => {
        // Quitado el tipo any y se utiliza directamente error
        console.error("Failed to update role", error);
      });
  };

  return (
    <div>
      <h1>Roles</h1>
      {roles.map((role) => (
        <div key={role.id} onClick={() => openEditPopup(role)}>
          {role.name}
        </div>
      ))}
      {isEditPopupOpen && (
        <EditRolePopup
          role={selectedRole as any}
          onClose={closeEditPopup}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
};

export default Roles;
