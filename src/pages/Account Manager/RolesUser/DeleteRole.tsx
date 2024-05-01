import React from "react";
import DeletePopUp from "../../../components/DeletePopUp";

interface DeleteRoleProps {
  roleId: string;
  roleName: string;
  onDelete: (roleId: string) => void;
  onClose: () => void;
}

const DeleteRole: React.FC<DeleteRoleProps> = ({
  roleId,
  roleName,
  onDelete,
  onClose,
}) => {
  const [open, setOpen] = React.useState(true);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // Add deleteRole function here
      onDelete(roleId);
      setOpen(false);
      onClose();
      // Add toast success message here
    } catch (err) {
      setIsDeleting(false);
      // Add toast error message here
    }
  };

  return (
    <DeletePopUp
      open={open}
      onClose={() => setOpen(false)}
      onConfirm={handleDelete}
      name={roleName}
    />
  );
};

export default DeleteRole;
