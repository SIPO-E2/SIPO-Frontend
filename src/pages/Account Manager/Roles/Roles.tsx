// Ejemplo de un componente que lista los roles
import { useEffect, useState } from "react";
import { useApisStore } from "../../../store/apiStore";
import "./Styles/Roles.css";
import EditRolePopUp from "../../../components/EditRolePopUp";
import CreateRolePopUp from "../../../components/CreateRolePopUp";

interface Role {
  id: string;
  name: string;
  users: User[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  activeDB: boolean;
}

const Roles = () => {
  const { roles, fetchRoles, updateRole } = useApisStore((state) => ({
    roles: state.roles,
    fetchRoles: state.fetchRoles,
    updateRole: state.updateRole,
  }));

  useEffect(() => {
    fetchRoles(); // Fetch roles when component mounts
  }, []);

  const [selectedRole, setSelectedRole] = useState<Role>({
    id: "",
    name: "",
    users: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
    activeDB: false,
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = (role: Role) => {
    setSelectedRole(role);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedRole({
      id: "",
      name: "",
      users: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
      activeDB: false,
    }); // Reset selected role
  };

  const handleEditSubmit = (roleData: { id: string; name: string }) => {
    updateRole(roleData)
      .then(() => {
        closeEditModal();
      })
      .catch((error) => {
        console.error("Failed to update role", error);
      });
  };

  /* --------------CREATE ROLE POPUP----------------- */

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateSubmit = (roleData: { name: string }) => {
    console.log("New role created:", roleData);
  };

  return (
    <div>
      <h1>Roles</h1>
      <button onClick={openCreateModal}>+ Add</button>
      {roles.map((role: Role) => (
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
      <CreateRolePopUp
        isOpen={isCreateModalOpen}
        onSubmit={handleCreateSubmit}
        onClose={closeCreateModal}
      />
    </div>
  );
};

export default Roles;
