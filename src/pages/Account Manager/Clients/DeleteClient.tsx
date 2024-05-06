import { useState } from "react";
import DeletePopUp from "../../../components/DeletePopUp";
import { useApisStore } from "../../../store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface DeleteClientProps {
  clientId: number;
  clientName: string;
  onDelete: (clientId: number) => void; // Adding this prop to handle the deletion
  onClose: () => void;
}

const DeleteClient: React.FC<DeleteClientProps> = ({
  clientId,
  clientName,
  onDelete,
  onClose,
}) => {
  const [open, setOpen] = useState(true);
  const { deleteClient } = useApisStore((state) => ({
    deleteClient: state.deleteClient,
  }));
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteClient(clientId);
      onDelete(clientId);
      setOpen(false);
      onClose();
      toast.success(`Client ${clientName} successfully deleted!`, {
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
      alert("Failed to delete client. Please try again.");
      toast.error(`Failed to delete ${clientName}. Please try again.`, {
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
      name={clientName}
    />
  );
};

export default DeleteClient;
