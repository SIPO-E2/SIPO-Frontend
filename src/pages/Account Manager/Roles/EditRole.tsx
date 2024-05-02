import { Fragment, useState } from "react";

const EditRole = ({ role, onSubmit, onClose }) => {
  const initialName = role ? role.name : "";
  const [name, setName] = useState(initialName);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ ...role, name });
  };

  return (
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
  );
};

export default EditRole;
