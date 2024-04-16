import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import TableProjects from '../../../components/TableProjects';



interface Props { };

const Projects = (props: Props) => {
  return (
    <>
      <div className="w-full">

        <div className="px-5 pt-4 d-flex mb-3">

          <div className="p-2 me-auto">
            <h1> Project </h1>
          </div>

          <div className="flex items-center space-x-4">

            <div className="p-2 flex items-center justify-center ">
              <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> + Project </button>
            </div>

            <div className="flex items-center border rounded-lg overflow-hidden w-64 ">

              <span className="pl-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m2-5a6.65 6.65 0 11-14 0 6.65 6.65 0 0113.3 0z"></path></svg>
              </span>

              <input type="search" id="default-search" className="p-2 pl-0 w-full text-sm bg-transparent focus:outline-none" placeholder="Search " />

              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Search
              </button>
            </div>

          </div>


          <div className="p-2 flex items-center justify-center">
            <button type="button"  className="pl-5">
              <FontAwesomeIcon icon={faFilter} />
            </button>
          </div>
        </div>
        <hr className="border-2 ml-6 mr-6 border-black-900" />
      </div>

      <TableProjects />
    </>
  )
};

export default Projects;