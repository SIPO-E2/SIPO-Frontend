// ViewClient.tsx
import { useOutletContext } from "react-router-dom";
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

const ViewClient = () => {
  const [currentClient] = useOutletContext<[Client | null]>();
  return (
    <div className="main-content-view-client">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side */}
        <div className="md:col-span-2 p-6 bg-white rounded-lg shadow-lg">
          <h1>Marketing Manager</h1>
          <h2>Job Description</h2>
          <p>
            Occaecati est et illo quibusdam accusamus qui. Incidunt aut et
            molestiae ut facere aut. Est quidem iusto praesentium excepturi
            harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium
            doloribus eaque debitis.
          </p>
          <h2>Key Responsibilities</h2>
          <ul>
            <li>
              Working with agency for design drawing detail, quotation and local
              production.
            </li>
            <li>
              Produce window displays, signs, interior displays, floor plans and
              special promotions displays
            </li>
            <li>
              Change displays to promote new product launches and reflect
              festive or seasonal themes.
            </li>
            <li>
              Planning and executing the open/renovation/ closing store
              procedure
            </li>
            <li>
              Follow‐up store maintenance procedure and keep updating SKU In &
              Out.
            </li>
            <li>Monitor costs and work within budget.</li>
            <li>Liaise with suppliers and source elements.</li>
          </ul>

          <h2>Why You'll Love Working Here</h2>
          <ul>
            <li>
              Working with agency for design drawing detail, quotation and local
              production.
            </li>
            <li>
              Produce window displays, signs, interior displays, floor plans and
              special promotions displays
            </li>
            <li>
              Change displays to promote new product launches and reflect
              festive or seasonal themes.
            </li>
            <li>
              Planning and executing the open/renovation/ closing store
              procedure
            </li>
            <li>
              Follow‐up store maintenance procedure and keep updating SKU In &
              Out.
            </li>
            <li>Monitor costs and work within budget.</li>
            <li>Liaise with suppliers and source elements.</li>
          </ul>
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          {/* Details Box */}
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="date-posted">
              <FontAwesomeIcon
                icon={faCalendarDays}
                className="icon-calendar"
              />
              <div className="date-info">
                <span className="date-title">Joining Date</span>
                <span className="date-value">{currentClient?.joiningDate}</span>
              </div>
            </div>

            <div className="date-posted">
              <FontAwesomeIcon icon={faBriefcase} className="icon-calendar" />
              <div className="date-info">
                <span className="date-title">Num. Projects</span>
                <span className="date-value">
                  {currentClient?.numberOfProjects}
                </span>
              </div>
            </div>

            <div className="date-posted">
              <FontAwesomeIcon icon={faUser} className="icon-calendar" />
              <div className="date-info">
                <span className="date-title">Client</span>
                <span className="date-value">
                  {currentClient?.highGrowthClient ? "High Growth" : "Regular"}
                </span>
              </div>
            </div>

            <div className="date-posted">
              <FontAwesomeIcon icon={faMoneyBill} className="icon-calendar" />
              <div className="date-info">
                <span className="date-title">Offered Salary</span>
                <span className="date-value">{currentClient?.money}</span>
              </div>
            </div>

            <div className="date-posted">
              <FontAwesomeIcon icon={faChartSimple} className="icon-calendar" />
              <div className="date-info">
                <span className="date-title">Experience</span>
                <span className="date-value">{currentClient?.experience}</span>
              </div>
            </div>

            <div className="date-posted">
              <FontAwesomeIcon
                icon={faEarthAmericas}
                className="icon-calendar"
              />
              <div className="date-info">
                <span className="date-title">Division</span>
                <span className="date-value">
                  {currentClient?.division.join(", ")}
                </span>
              </div>
            </div>

            {/* ... Other details like Expiration date, Employment type ... */}
          </div>

          {/* Company Box */}
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h4 className="text-lg font-semibold">
              Gleicher, Mueller and Tromp
            </h4>
            <p className="text-sm">
              1147 Rohan Drive Suite 819 - Burlington, VT / 80201
            </p>
            <p className="text-sm">904-966-2836</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewClient;
