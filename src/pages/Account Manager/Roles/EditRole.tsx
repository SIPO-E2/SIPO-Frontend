import React from "react";
import EditRolePopUp from "../../../components/EditRolePopUp";
import { useApisStore } from "../../../store";

interface EditRoleProps {
  roleId: string;
  roleName: string;
  onEdit: (roleId: string, name: string) => void;
  onClose: () => void;
}

const EditRole: React.FC<EditRoleProps> = ({
  roleId,
  roleName,
  onEdit,
  onClose,
}) => {
  const [open, setOpen] = React.useState(true);
  const { updateRole } = useApisStore((state) => ({
    updateRole: state.updateRole,
  }));

  const [isEditing, setIsEditing] = React.useState(false);

  const handleEdit = async (name: string) => {
    try {
      await updateRole({ id: roleId, name: name });
      onEdit(roleId, name);
      onClose();
    } catch (err) {
      setIsEditing(false);
      alert("Failed to update role. Please try again.");
    }
  };

  return (
    <EditRolePopUp
      open={true}
      onClose={() => setOpen(false)}
      onEdit={handleEdit}
      roleName={roleName}
    />
  );
};

export default EditRole;
