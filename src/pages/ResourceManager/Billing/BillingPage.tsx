import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter,faEye, faPencilAlt, faTrash, faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {useState, useEffect} from 'react';
import { deleteBilling, getBillings } from '../../../api/billingAPI';
import { useApisStore } from '../../../store';
import { Billing } from "../../../types/entities";
import ViewBillingModal from "./ViewBillingModal";
import DeleteModal from "../../../components/DeleteModal";

interface Props {}  

const BillingPage = (props: Props)=>{

  //Fetch Billings
  const{billings, fetchBillings} = useApisStore();
  useEffect(() =>{
    fetchBillings();
  },[])


  // Search Billings
  const [searchValue, setSearchValue] = useState('');
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const handleSearch = () => {
    if (searchValue.trim() !== ''){
    setSearchValue(searchValue);  
    }
  } 
  const searchBillings = billings?.filter(billing =>{
    const searchValueLower = searchValue.toLowerCase();
    return (
      (billing.employeeInformation?.candidateInformation?.personInformation?.name ?? '').toLowerCase().includes(searchValueLower) ||
      (billing.employeeInformation?.candidateInformation?.personInformation?.division ?? '').toLowerCase().includes(searchValueLower) ||
      (billing.employeeInformation?.candidateInformation?.personInformation?.tech_stack ?? '').toLowerCase().includes(searchValueLower)
    );
    });

  
  //Stablish pagination
  const [currentPage, setCurrentPage] = useState(1);
  const billingsPerPage = 10;
  const indexOfLastBilling = currentPage * billingsPerPage;
  const indexOfFirstBilling = indexOfLastBilling - billingsPerPage;
  const currentBilling = billings?.slice(indexOfFirstBilling, indexOfLastBilling);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Display billings
  const displayBillings = searchValue 
  ? searchBillings?.filter(billing => billing.activeDB !== false) 
  : currentBilling?.filter(billing => billing.activeDB !== false);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Estado para almacenar el pipeline seleccionado
  const [selectedBilling, setSelectedBilling] = useState<Billing | null>(null);
  const openModal = (billing: Billing) => {
    setSelectedBilling(billing);
    setIsModalOpen(true);
  };

  //Editar pipeline
  const navegation = useNavigate();
  const handleEditClick = (billing: Billing) => {
    setSelectedBilling(billing);
    navegation(`/resourceManager/billing/editBilling/${billing.id}`);
  };

  // Delete Billing
  const [deleteActive, setDeleteActive] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(-1);
  const handleDeleteBilling = async (billingId: number) => {
    try{
      await deleteBilling(billingId.toString()),
      fetchBillings();
    }catch(error){
      console.error("Error deleting billing", error)
      alert("Failed to delete bench");
    }
  };
  
  // const [dropdownOpen, setDropdownOpen] = useState(false);

  // const toggleDropdown = () => {
  //   setDropdownOpen(!dropdownOpen);
  // };

  return(
  <>
    <div className='w-full'>

      <div className='px-5 pt-4 d-flex mb-3'>

        <div className="p-2 me-auto">
          <h1> <a className='text-dark no-underline' href="/resourceManager">Work Force</a></h1>
        </div>

        {/* Filter and Search */}
        <div className="flex items-center space-x-4">

          <div className="flex items-center border rounded-lg overflow-hidden w-64 ">

            <span className="pl-2">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m2-5a6.65 6.65 0 11-14 0 6.65 6.65 0 0113.3 0z"></path></svg>
            </span>

            <input type="search" id="default-search" 
              className="p-2 pl-0 w-full text-sm bg-transparent focus:outline-none" 
              placeholder="Search " 
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
          <div className="p-2 flex items-center justify-center">
            <button className="pl-0" type="button" >
              <FontAwesomeIcon icon={faFilter} />
            </button>
          </div>
        </div>
      </div>
      
      <hr className="border-2 ml-10 mr-10 border-black-900" />

      {/* Selection Bar  (3 views)*/}
      <div className='ml-10 mr-10 p-4 d-flex justify-content-between'>
        <div className='d-flex flex-row'>
          <div className='mr-20'>
            <Link to="/resourceManager/pipeline">
              <button className='btn btn-dark btn-lg rounded'>Pipeline</button>
            </Link>
          </div>
          <div className='mr-20'>
            <Link to="/resourceManager/bench">
              <button className='btn btn-dark btn-lg rounded'>Bench</button>
            </Link>
          </div>
          <div className='mr-20'>
              <Link to="/resourceManager/billing">
                  <button className='btn btn-dark btn-lg rounded'>Billing</button>
              </Link>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto sm:rounded-lg p-4">
        <table className=" w-full text-sm  rtl:text-right text-gray-500 dark:text-gray-400 shadow-md rounded">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
              <th scope="col" className="px-6 py-3 text-center">Name</th>
              <th scope="col" className="px-6 py-3 text-center">Division</th>
              <th scope="col" className="px-6 py-3 text-center">Job Title </th>
              <th scope="col" className="px-6 py-3 text-center">Job Grade</th>
              <th scope="col" className="px-6 py-3 text-center">Skills</th>
              <th scope="col" className="px-6 py-3 text-center">Employee Work Status </th>
              <th scope="col" className="px-6 py-3"> </th>
              <th scope="col" className="px-6 py-3"> </th>
              <th scope="col" className="px-6 py-3"> </th>
              <th scope="col" className="px-6 py-3"> </th>
            </tr>
          </thead>
          <tbody>
            {displayBillings?.map((billing) => (
              <tr className="border-b dark:border-gray-700" key={billing.id}>
                <td className="px-6 py-4 text-center">
                  {billing.employeeInformation.candidateInformation?.personInformation?.name}
                </td>
                
                <td className="px-6 py-4 text-center">
                  {billing.employeeInformation.candidateInformation.personInformation?.divi}
                </td>
                
                <td className="px-6 py-4 text-center">
                  {billing.employeeInformation.job_title}
                </td>
                
                <td className="px-6 py-4 text-center">
                  {billing.employeeInformation.job_grade}
                </td>
                <td className='px-6 py-4 text-center'>
                  {billing.employeeInformation.candidateInformation.personInformation.skil?.map((skill, index) => (
                      <span key={index} className="badge rounded-pill bg-primary text-white mr-2">
                      {skill}
                      </span>
                  ))}
                </td>
                <td className="px-6 py-4 text-center">
                  {billing.employeeInformation.status}
                </td>

                <td className="pl-6 py-4">
                  <button type="button" className="font-medium hover:underline"
                    onClick={() => openModal(billing)}>
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </td>

                <td className="pl-3  py-4">
                  <button type="button" className="font-medium hover:underline"
                  onClick={() => handleEditClick(billing)}>
                      <FontAwesomeIcon icon={faPencilAlt} />
                  </button>
                </td>

                <td className=" pr-6 py-4">
                  <button onClick={() => { setDeleteActive(true); setSelectedId(billing.id); }}>
                        <FontAwesomeIcon icon={faTrash} /> 
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end  m-6">
          <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="mr-2 font-medium hover:underline"
          >
              <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastBilling >= billings?.length}
              className="font-medium hover:underline"
          >
              <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
    {/* Modal */}
    {deleteActive && <DeleteModal isActive={deleteActive} selectedId={selectedId} setDeleteActive={setDeleteActive} onDeleteConfirm={handleDeleteBilling} />}
  <ViewBillingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} billing={selectedBilling} />
  </>);
}

export default BillingPage;