import React from "react";
import DeletePopUp from "../../../components/DeletePopUp";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useApisStore } from "../../../store";

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
  const { deleteRole } = useApisStore((state) => ({
    deleteRole: state.deleteRole,
  }));
  const [isDeleting, setIsDeleting] = React.useState(false);

  const navigate = useNavigate();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteRole(roleId);
      onDelete(roleId);
      setOpen(false);
      onClose();
      toast.success(`Role ${roleName} successfully deleted!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      setIsDeleting(false);
      alert("Failed to delete role. Please try again.");
      toast.error(`Failed to delete ${roleName}. Please try again.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
