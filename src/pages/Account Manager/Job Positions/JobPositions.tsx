
import TableJobPositions from "../../../components/TableJobPositions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';


const JobPositions = () => {

  return(
    <>
      <div className="w-full">

        <div className="px-5 pt-4 d-flex mb-3">

          <div className="p-2 me-auto">
            <h1> Job Positions </h1>
          </div>

          <div className="p-2 flex items-center justify-center">
            <button type="button" className="btn btn-primary"> Add Job Position </button>
          </div>


          <div className="p-2 flex items-center justify-center">
            <button type="button" >
              <FontAwesomeIcon icon={faFilter} />
            </button>
          </div>
        </div>
        <hr className="border-2 ml-10 mr-10 border-black-900"/>

      </div>
      <TableJobPositions/>

    </>
  )
};

export default JobPositions;
