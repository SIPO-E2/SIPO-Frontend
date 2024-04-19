import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useClientContext } from "./ClientContext";

const ClientProjects = () => {
  const [currentClient] = useClientContext();

  // Check if currentClient is null or if projects is undefined
  if (!currentClient || !currentClient.projects) {
    return (
      <div>No client data available or projects data is not available.</div>
    );
  }

  return (
    <div className="client-projects-container">
      <div className="mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
          {currentClient.projects.map((project, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md w-full"
            >
              <div className="project-container-information">
                <div className="header-client-project">
                  <h6 className="project-name-client-project">
                    {project.projectName}
                  </h6>
                  <div className="date-container-client-project">
                    <FontAwesomeIcon
                      icon={faCalendar}
                      className="calendar-icon-client-project"
                    />
                    <p>{new Date(project.posting_date).toLocaleDateString()}</p>
                  </div>
                </div>
                <h4 className="status-client-project">{project.status}</h4>
                <div className="flex justify-between w-full mt-2">
                  <div className="text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg px-2 py-1 completed-label-client-project">
                    Completed: {project.completed}%
                  </div>
                  <div className="text-xs font-medium text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg px-2 py-1 to-do-label-client-project">
                    To Do: {project.toDo}%
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
                <hr />
                <div className="bottom-card-client-project">
                  <div className="image-container-client-project">
                    {project.employeesImage.map((imgUrl, empIndex) => (
                      <img
                        key={empIndex}
                        src={imgUrl}
                        alt={project.employees[empIndex]}
                        className="image-avatar-client-project"
                      />
                    ))}
                  </div>
                  <div className="assigned-detail-client-project">
                    <div className="revenue-container-client-project">
                      <span className="revenue-text-client-project">
                        REVENUE
                      </span>
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
      </div>
    </div>
  );
};

export default ClientProjects;
