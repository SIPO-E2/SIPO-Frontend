import { useOutletContext } from "react-router-dom";
import "./ClientProjects.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlag,
  faThumbsUp,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

interface Client {
  id: number;
  imageURL: string;
  name: string;
  joiningDate: string;
  numberOfProjects: number;
  experience: string;
  money: string;
  division: string[];
  contractFile?: File | null;
  additionalDetails?: string;
  highGrowthClient: boolean;
}

const ClientProjects = () => {
  const [currentClient] = useOutletContext() as [
    Client | null,
    React.Dispatch<React.SetStateAction<Client | null>>
  ];

  return (
    <div className="client-projects-container">
      <div className="mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <div className="project-container-information">
              <div className="header-client-project">
                <h6 className="project-name-client-project">INSPIRE LIMIT</h6>
                <div className="date-container-client-project">
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="calendar-icon-client-project"
                  />
                  <p>22d</p>
                </div>
              </div>
              <h4 className="status-client-project">Maintenance</h4>
              <hr />
              <div className="bottom-card-client-project">
                <div className="image-container-client-project">
                  <img
                    src="https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg"
                    alt="Avatar"
                    className="image-avantar-client-project"
                  />
                  <img
                    src="https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg"
                    alt="Avatar"
                    className="image-avantar-client-project"
                  />
                </div>
                <div className="assigned-detail-client-project">
                  <div className="status-container">
                    <span className="status-text">UNASSIGNED</span>
                    <span className="status-number red">
                      <FontAwesomeIcon
                        icon={faFlag}
                        className="flag-icon-client-project"
                      />{" "}
                      5
                    </span>
                    <span className="status-number green">
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        className="thumbs-up-icon-client-project"
                      />
                      15
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <h1>Carta 2</h1>
          </div>
          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <h1>Carta 3</h1>
          </div>
          {/* Card 4 */}
          <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <h1>Carta 4</h1>
          </div>
          {/* More cards if necessary */}
        </div>
      </div>
    </div>
  );
};

export default ClientProjects;
