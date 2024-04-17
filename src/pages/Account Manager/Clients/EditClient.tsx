import { useParams } from "react-router-dom";

const EditClient = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Editando Cliente {id}</h2>
    </div>
  );
};

export default EditClient;
