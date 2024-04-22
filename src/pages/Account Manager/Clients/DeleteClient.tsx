import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import DeletePopUp from "../../../components/DeletePopUp";

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

  const handleDelete = () => {
    console.log("Deleting client with ID:", clientId);
    alert(`Client ${clientName} deleted`);
    setOpen(false);
    onClose();
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
