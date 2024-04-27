import { useState } from "react";
import DeletePopUp from "../../../components/DeletePopUp";
import { useApisStore } from "../../../store";

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

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteClient(clientId);
      onDelete(clientId);
      console.log("Deleting client with ID:", clientId);
      alert(`Client ${clientName} deleted`);
      setOpen(false);
      onClose();
      alert("Client successfully deleted!");
    } catch (err) {
      console.error("Failed to delete client:", err);
      setIsDeleting(false);
    }
  };

  return (
    <DeletePopUp
      open={open}
      onClose={() => setOpen(false)}
      onConfirm={handleDelete}
      clientName={clientName}
    />
  );
};

export default DeleteClient;
