import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface Role {
  id: string;
  name: string;
}

interface EditRolePopupProps {
  role: Role;
  onClose: () => void;
  onSubmit: (roleData: Role) => void;
}

interface Role {
  // Añadida la interfaz Role
  id: string;
  name: string;
}

interface EditRolePopupProps {
  role: Role;
  onClose: () => void;
  onSubmit: (roleData: Role) => void;
}

const EditRolePopup: React.FC<EditRolePopupProps> = ({
  role,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState(role.name);

  const handleSubmit = (event) => {
    // Quitado el tipo React.FormEvent<HTMLFormElement> ya que se puede inferir
    event.preventDefault();
    onSubmit({ ...role, name });
  };

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        position: "fixed",
        top: "20%",
        left: "30%",
      }}
    >
      <form onSubmit={handleSubmit}>
        <label htmlFor="roleName">Role Name:</label>
        <input
          id="roleName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditRolePopup;
