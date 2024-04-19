import React from "react";
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
  // Find the client data using clientId
  const client = clientes.find((client) => client.id === clientId);

  // Filter the projects for this specific client
  const clientProjects = projects.filter(
    (project) => project.clientId === clientId
  );

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
          <div className="flex justify-between items-center mb-4">
            <h6 className="text-lg font-semibold">{project.projectName}</h6>
            <div className="flex items-center text-gray-500">
              <FontAwesomeIcon icon={faCalendar} className="h-4 w-4 mr-2" />
              <p className="text-sm">
                {new Date(project.posting_date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="mb-4">
            <h4 className="text-md text-blue-600">{project.status}</h4>
          </div>
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-1.5 rounded-full"
                style={{ width: `${project.completed}%` }}
              ></div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex">
              {project.employeesImage.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={project.employees[index]}
                  className="h-10 w-10 rounded-full border-2 border-white -ml-2"
                />
              ))}
            </div>
            <div className="text-right">
              <span className="text-sm font-semibold text-gray-600">
                Revenue
              </span>
              <p className="text-lg font-bold text-gray-900">
                <FontAwesomeIcon icon={faMoneyBill} className="h-4 w-4 mr-2" />
                {project.revenue}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ClientProjectsCards;
