import React from "react";
import { useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams<{ id: string }>(); // Convert the id property to a string

  return <div>EditUser</div>;
};

export default EditUser;
