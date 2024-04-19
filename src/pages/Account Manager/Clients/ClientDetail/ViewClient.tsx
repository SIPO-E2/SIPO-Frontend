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
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Side */}
        <div className="md:col-span-8 p-6 bg-white rounded-lg shadow-lg">
          <div className="details-section-view-client">
            <h1 className="client-name-view-client">{currentClient?.name}</h1>
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
            <h2 className="client-benefits-title">Benefits</h2>
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
            <div className="location-card">
              <div>
                <img
                  src={currentClient?.imageURL}
                  className="card-image"
                  alt="Company Logo"
                />
              </div>
              <div className="right-card-section">
                <h4 className="owners-view-client">Lueilwitz and Sons</h4>
                <p className="client-direction-view-client">
                  19034 Verna Unions Apt. 164 - <br></br> Honolulu, RI / 87535
                </p>
                <p className="client-telephone-view-client">365-374-4961</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewClient;
