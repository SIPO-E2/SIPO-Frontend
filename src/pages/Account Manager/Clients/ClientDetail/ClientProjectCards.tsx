import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faCalendar } from "@fortawesome/free-solid-svg-icons";
import "./ClientProjects.css";
interface Client {
  id: number;
  owner_user_id: number;
  owner_user: User;
  name: string;
  divisions: Division[];
  high_growth: boolean;
  projects: Project[];
  activeDB: boolean;
  joiningDate: Date;
  experience: string;
  salary: number;
  imageURL: string;
  contractFile: File | null;
  additionalDetails: string;
}

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
    <>
      {client.projects.length > 0 ? (
        <div>
          <ul>
            {client.projects.map((project, index) => (
              <div
                key={project.id}
                className="bg-white p-6 rounded-lg shadow-md w-full"
              >
                <h3>{project.name}</h3>
                <p>
                  {calculateDifferenceInDays(project.exp_closure_date)}
                  days remaining
                </p>
                <h4 className="status-client-project">{project.status}</h4>

                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: project.progress + "%" }}
                  ></div>
                </div>
                <p>Region: {project.region}</p>
                <p>Revenue: ${project.revenue}</p>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <p>No projects available.</p>
      )}
    </>
  );
};

export default ClientProjectsCards;
