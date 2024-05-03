import { deleteCandidate } from '../../../api/candidateAPI';

interface Props {
    isActive:boolean;
    selectedId: number;
    setDeleteActive:Function;
}

const DeletePipelineModal = (props: Props)=>{ // definimos un componente llamado deleteProductModal que recibe como parámetro un objeto de la interfaz Props

    const handleDelete = async () => {
        deleteCandidate(props.selectedId).then(()=>props.setDeleteActive(false));

    }

    return (
        <div id="modal-delete-product" className={props.isActive ? "modal is-active" : "modal"}>
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="box p-0">
              <nav className="panel is-warning">
                <p className="panel-heading">All Products</p>
                <div className="panel-block pt-5 pb-5">
                  <p>Do you want to delete the product {props.selectedId}?</p>
                </div>
                <div className="panel-block">
                  <div className="field is-grouped ">
                    <button
                      className="button is-primary"
                      onClick={() => { 
                        deleteCandidate(props.selectedId);
                        props.setDeleteActive(false);
                      }}>
                      Confirm
                    </button>
                    <button
                      className="button"
                      onClick={() => {
                        props.setDeleteActive(false);
                      }}>
                      Cancel
                    </button>
                  </div>
                </div>
              </nav>
            </div>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => {
              props.setDeleteActive(false);
            }}
          ></button>
        </div>
    );
};

export default DeletePipelineModal;