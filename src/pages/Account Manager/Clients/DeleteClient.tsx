import { useState } from "react";
import DeletePopUp from "../../../components/DeletePopUp";
import { useApisStore } from "../../../store";
interface Client {
  id: number;
  owner_user_id: number;
  owner_user: User;
  name: string;
  division: Division;
  high_growth: boolean;
  projects: Project[];
  // employees: Employee[];
  activeDB: boolean;
  joiningDate: Date;
  experience: string;
  salary: number;
  imageURL: string;
  contractFile?: File | null;
  additionalDetails: string;
}

interface DeleteClientProps {
  clientId: number;
  clientName: string;
  onClose: () => void;
}

const DeleteClient: React.FC<DeleteClientProps> = ({
  clientId,
  clientName,
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
