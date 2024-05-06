import { useState } from "react";
import DeletePopUp from "../../../components/DeletePopUp";
import { useApisStore } from "../../../store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface DeleteUserProps {
  userId: number;
  userName: string;
  onDelete: (userId: number) => void; // Adding this prop to handle the deletion
  onClose: () => void;
}

const DeleteUser: React.FC<DeleteUserProps> = ({
  userId,
  userName,
  onDelete,
  onClose,
}) => {
  const [open, setOpen] = useState(true);
  const { deleteUser } = useApisStore((state) => ({
    deleteUser: state.deleteUser,
  }));
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteUser(userId);
      onDelete(userId);
      setOpen(false);
      onClose();
      toast.success(`User ${userName} successfully deleted!`, {
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
      alert("Failed to delete user. Please try again.");
      toast.error(`Failed to delete ${userName}. Please try again.`, {
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
      name={userName}
    />
  );
};

export default DeleteUser;
