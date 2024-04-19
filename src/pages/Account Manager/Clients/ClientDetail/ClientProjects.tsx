import { useOutletContext } from "react-router-dom";
import "./ClientProjects.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faCalendar } from "@fortawesome/free-solid-svg-icons";

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
                <h6 className="project-name-client-project">INSPIRE LIMITED</h6>
                <div className="date-container-client-project">
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="calendar-icon-client-project"
                  />
                  <p>22d</p>
                </div>
              </div>
              <h4 className="status-client-project">Maintenance</h4>
              <div className="flex justify-between w-full mt-2">
                <div className="text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg px-2 py-1 completed-label-client-project">
                  Completed: 28.91%
                </div>
              </div>
              <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="flex flex-col justify-center overflow-hidden bg-green-400 text-xs text-white text-center whitespace-nowrap"
                  style={{ width: "28.91%" }}
                  role="progressbar"
                  aria-valuenow={28.91}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>

                <div
                  className="flex flex-col justify-center overflow-hidden bg-yellow-400 text-xs text-white text-center whitespace-nowrap"
                  style={{ width: "31.60%" }}
                  role="progressbar"
                  aria-valuenow={31.6}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
              <div className="flex justify-between w-full mt-2">
                <div className="text-xs font-medium text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg px-2 py-1 to-do-label-client-project">
                  To Do: 31.60%
                </div>
              </div>

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
                  <div className="revenue-container-client-project">
                    <span className="revenue-text-client-project">REVENUE</span>
                    <span className="revenue-number-green-client-project">
                      <FontAwesomeIcon
                        icon={faMoneyBill}
                        className="money-icon-client-project"
                      />
                      $50,000
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
