import projects from "../Data/projectsData";
import clientes from "../Data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faCalendar } from "@fortawesome/free-solid-svg-icons";
import "./ClientProjects.css";

// Define a type for the component's props
type ClientProjectsProps = {
  clientId: number;
};

function ClientProjectsCards({ clientId }: ClientProjectsProps) {
  const client = clientes.find((client) => client.id === clientId);

  const clientProjects = projects.filter(
    (project) => project.clientId === clientId
  );
  const calculateDifferenceInDays = (dateString: string): number => {
    const today = new Date();
    const expDate = new Date(dateString);
    const differenceInTime = expDate.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  const baseStyle = "date-container-client-project";

  const getDaysRemainingStyles = (daysRemaining: number) => {
    let style = `${baseStyle}`;
    if (daysRemaining <= 7) {
      style += " red-contaier-client-project";
    }
    return style;
  };

  if (!client) {
    return <div>Client not found</div>;
  }

  return (
    <>
      {clientProjects.map((project) => (
        <div
          key={project.id}
          className="bg-white p-6 rounded-lg shadow-md w-full"
        >
          <div className="header-client-project">
            <h6 className="project-name-client-project">
              {project.projectName}
            </h6>
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
              Completed: {project.completed}%
            </div>
          </div>
          <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="flex flex-col justify-center overflow-hidden bg-green-400 text-xs text-white text-center whitespace-nowrap"
              style={{ width: `${project.completed}%` }}
              role="progressbar"
              aria-valuenow={project.completed}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
            <div
              className="flex flex-col justify-center overflow-hidden bg-yellow-400 text-xs text-white text-center whitespace-nowrap"
              style={{ width: `${project.toDo}%` }}
              role="progressbar"
              aria-valuenow={project.toDo}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
          <div className="flex justify-between w-full mt-2">
            <div className="text-xs font-medium text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg px-2 py-1 to-do-label-client-project">
              To Do: {project.toDo}%
            </div>
          </div>
          <hr />
          <div className="bottom-card-client-project">
            <div className="image-container-client-project">
              {project.employeesImage.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={project.employees[index]}
                  className="image-avatar-client-project"
                />
              ))}
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
      ))}
    </>
  );
}

export default ClientProjectsCards;
