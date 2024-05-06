import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faCalendar } from "@fortawesome/free-solid-svg-icons";
import "./ClientProjects.css";
import { Client } from "../../../../types";

const ClientProjectsCards = ({ client }: { client: Client }) => {
  const calculateDifferenceInDays = (date: Date | string): number => {
    const today = new Date();
    let expDate;

    if (typeof date === "string") {
      expDate = new Date(date); // Convertimos de cadena a Date
    } else {
      expDate = date; // Ya es un objeto Date, lo usamos directamente
    }

    const differenceInTime = expDate.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  const baseStyle = "date-container-client-project";

  const getDaysRemainingStyles = (daysRemaining: number) => {
    let style = `${baseStyle}`;
    if (daysRemaining <= 7) {
      style += " red-container-client-project";
    }
    return style;
  };

  return (
    <div className="row">
      {client.projects.map((project, index) => (
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={project.id}>
          <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <div className="header-client-project">
              <h6 className="project-name-client-project">{project.name}</h6>
              <div
                className={getDaysRemainingStyles(
                  calculateDifferenceInDays(project.exp_closure_date)
                )}
              >
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="calendar-icon-client-project"
                />
                <p>
                  {calculateDifferenceInDays(project.exp_closure_date)} days
                  remaining
                </p>
              </div>
            </div>
            <h4 className="status-client-project">{project.status}</h4>
            <div className="flex justify-between w-full mt-2">
              <div className="text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg px-2 py-1 completed-label-client-project">
                Completed: {project.progress}%
              </div>
            </div>
            <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="flex flex-col justify-center overflow-hidden bg-green-400 text-xs text-white text-center whitespace-nowrap"
                style={{ width: `${project.progress}%` }}
                role="progressbar"
                aria-valuenow={project.progress}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
              <div
                className="flex flex-col justify-center overflow-hidden bg-yellow-400 text-xs text-white text-center whitespace-nowrap"
                style={{ width: `${100 - project.progress}%` }}
                role="progressbar"
                aria-valuenow={100 - project.progress}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
            <div className="flex justify-between w-full mt-2">
              <div className="text-xs font-medium text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg px-2 py-1 to-do-label-client-project">
                To Do: {100 - project.progress}%
              </div>
            </div>
            <hr />
            <div className="bottom-card-client-project">
              <div className="owner-user-container-client-project">
                <img
                  src={client.owner_user.profileImage}
                  className="owner-user-client-project-image "
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
                    {project.revenue}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientProjectsCards;
