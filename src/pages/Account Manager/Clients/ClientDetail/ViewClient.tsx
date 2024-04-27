// ViewClient.tsx
import "./ViewClient.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faBriefcase,
  faChartSimple,
  faEarthAmericas,
  faMoneyBill,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useOutletContext } from "react-router-dom";

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

const ViewClient = () => {
  // We obtain the client from the Outlet so we dont have to fetch it again
  const [client] = useOutletContext<[Client]>();

  // print the divisions of the client
  const divisions = client.divisions.map((division) => division).join(", ");

  return (
    <div className="main-content-view-client">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Side */}
        <div className="md:col-span-8 p-6 bg-white rounded-lg shadow-md">
          <div className="details-section-view-client">
            <h1 className="client-name-view-client">{client.name}</h1>
            <h2 className="client-description-title">Client Description</h2>
            <p className="client-description-text">
              Occaecati est et illo quibusdam accusamus qui. Incidunt aut et
              molestiae ut facere aut. Est quidem iusto praesentium excepturi
              harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium
              doloribus eaque debitis.
            </p>
            <h2 className="client-key-title">Key Responsibilities</h2>
            <ul className="custom-bullet">
              <li className="list-item">
                Working with agency for design drawing detail, quotation and
                local production.
              </li>
              <li className="list-item">
                Produce window displays, signs, interior displays, floor plans
                and special promotions displays
              </li>
              <li className="list-item">
                Change displays to promote new product launches and reflect
                festive or seasonal themes.
              </li>
              <li className="list-item">
                Planning and executing the open/renovation/ closing store
                procedure
              </li>
              <li className="list-item">
                Follow‐up store maintenance procedure and keep updating SKU In &
                Out.
              </li>
              <li className="list-item">
                Monitor costs and work within budget.
              </li>
              <li className="list-item">
                Liaise with suppliers and source elements.
              </li>
            </ul>

            <h2 className="client-why-title">Why You'll Love Working Here</h2>
            <ul className="custom-bullet">
              <li className="list-item">
                Working with agency for design drawing detail, quotation and
                local production.
              </li>
              <li className="list-item">
                Produce window displays, signs, interior displays, floor plans
                and special promotions displays
              </li>
              <li className="list-item">
                Change displays to promote new product launches and reflect
                festive or seasonal themes.
              </li>
              <li className="list-item">
                Planning and executing the open/renovation/ closing store
                procedure
              </li>
              <li className="list-item">
                Follow‐up store maintenance procedure and keep updating SKU In &
                Out.
              </li>
              <li className="list-item">
                Monitor costs and work within budget.
              </li>
              <li className="list-item">
                Liaise with suppliers and source elements.
              </li>
            </ul>
            <h2 className="client-benefits-title">Contract File</h2>
            <div className="benefits">
              <span className="benefit-tag">Free parking</span>
              <span className="benefit-tag">Bonus commission</span>
              <span className="benefit-tag">Travel</span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:col-span-4 space-y-6">
          {/* Details Box */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="date-posted">
              <FontAwesomeIcon
                icon={faCalendarDays}
                className="icon-calendar"
              />
              <div className="date-info">
                <span className="date-title">Joining Date</span>
                <span className="date-value">
                  {client.joiningDate
                    ? new Date(client.joiningDate).toISOString().slice(0, 10)
                    : ""}
                </span>
              </div>
            </div>

            <div className="date-posted">
              <FontAwesomeIcon icon={faBriefcase} className="icon-calendar" />
              <div className="date-info">
                <span className="date-title">Num. Projects</span>
                <span className="date-value">{client.projects.length}</span>
              </div>
            </div>

            <div className="date-posted">
              <FontAwesomeIcon icon={faUser} className="icon-calendar" />
              <div className="date-info">
                <span className="date-title">Client</span>
                <span className="date-value">
                  {client.high_growth ? "High Growth" : "Regular"}
                </span>
              </div>
            </div>

            <div className="date-posted">
              <FontAwesomeIcon icon={faMoneyBill} className="icon-calendar" />
              <div className="date-info">
                <span className="date-title">Offered Salary</span>
                <span className="date-value">
                  {client.salary ? client.salary : 0}
                </span>
              </div>
            </div>

            <div className="date-posted">
              <FontAwesomeIcon icon={faChartSimple} className="icon-calendar" />
              <div className="date-info">
                <span className="date-title">Experience</span>
                <span className="date-value">{client.experience}</span>
              </div>
            </div>

            <div className="date-posted">
              <FontAwesomeIcon
                icon={faEarthAmericas}
                className="icon-calendar"
              />
              <div className="date-info">
                <span className="date-title">Division</span>
                <span className="date-value">{divisions}</span>
              </div>
            </div>
          </div>

          {/* Company Box */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="location-card">
              <div>
                <img
                  src={client.imageURL}
                  className="card-image"
                  alt="Company Logo"
                />
              </div>
              <div className="right-card-section">
                <h4 className="owners-view-client">{client.owner_user.name}</h4>
                <p className="client-direction-view-client">
                  {client.owner_user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewClient;
